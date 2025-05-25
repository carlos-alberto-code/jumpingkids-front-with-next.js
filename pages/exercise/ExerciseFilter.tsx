import React, { useState, useEffect, useMemo } from 'react';
import {
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  InputAdornment,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  HeartBroken as HeartBrokenIcon,
  ViewColumn as ViewColumnIcon,
  ViewModule as ViewModuleIcon,
  FilterListOff as FilterListOffIcon
} from '@mui/icons-material';

const ExerciseFilter: React.FC<ExerciseFilterProps> = ({
  onFiltersChange,
  onViewModeChange,
  currentFilters,
  currentViewMode,
  availableCategories
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Estado local para debounce de búsqueda
  const [searchInput, setSearchInput] = useState(currentFilters.searchQuery);

  // Debounce effect para la búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput !== currentFilters.searchQuery) {
        onFiltersChange({
          ...currentFilters,
          searchQuery: searchInput
        });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput, currentFilters, onFiltersChange]);

  // Sincronizar searchInput con currentFilters cuando cambie externamente
  useEffect(() => {
    setSearchInput(currentFilters.searchQuery);
  }, [currentFilters.searchQuery]);

  // Verificar si hay filtros activos
  const hasActiveFilters = useMemo(() => {
    return (
      currentFilters.searchQuery !== '' ||
      currentFilters.category !== null ||
      currentFilters.difficulty !== null ||
      currentFilters.favoriteFilter !== 'all'
    );
  }, [currentFilters]);

  // Handlers
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event: any) => {
    const value = event.target.value;
    onFiltersChange({
      ...currentFilters,
      category: value === '' ? null : value
    });
  };

  const handleDifficultyChange = (event: any) => {
    const value = event.target.value;
    onFiltersChange({
      ...currentFilters,
      difficulty: value === '' ? null : value
    });
  };

  const handleFavoriteToggle = () => {
    let nextState: FilterState['favoriteFilter'];
    
    switch (currentFilters.favoriteFilter) {
      case 'all':
        nextState = 'favorites';
        break;
      case 'favorites':
        nextState = 'non-favorites';
        break;
      case 'non-favorites':
        nextState = 'all';
        break;
      default:
        nextState = 'all';
    }

    onFiltersChange({
      ...currentFilters,
      favoriteFilter: nextState
    });
  };

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewMode: ViewMode | null
  ) => {
    if (newViewMode !== null) {
      onViewModeChange(newViewMode);
    }
  };

  const handleClearFilters = () => {
    setSearchInput('');
    onFiltersChange({
      searchQuery: '',
      category: null,
      difficulty: null,
      favoriteFilter: 'all'
    });
  };

  // Render del ícono de favoritos según el estado
  const renderFavoriteIcon = () => {
    switch (currentFilters.favoriteFilter) {
      case 'favorites':
        return <FavoriteIcon />;
      case 'non-favorites':
        return <HeartBrokenIcon />;
      default:
        return <FavoriteBorderIcon />;
    }
  };

  // Color del botón de favoritos
  const getFavoriteColor = (): 'standard' | 'primary' | 'secondary' => {
    switch (currentFilters.favoriteFilter) {
      case 'favorites':
        return 'primary';
      case 'non-favorites':
        return 'secondary';
      default:
        return 'standard';
    }
  };

  return (
    <Box sx={{ mb: 3, width: '100%' }}>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        alignItems={isMobile ? 'stretch' : 'center'}
        sx={{
          p: 2,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[1],
          width: '100%'
        }}
      >
        {/* Barra de búsqueda */}
        <TextField
          fullWidth={isMobile}
          sx={{ 
            flex: isMobile ? undefined : 1, 
            minWidth: isMobile ? undefined : 300,
            maxWidth: isMobile ? undefined : '50%'
          }}
          placeholder="Buscar ejercicios..."
          value={searchInput}
          onChange={handleSearchChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          variant="outlined"
          size="small"
        />

        {/* Filtros en fila separada en móvil, misma fila en desktop */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ 
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            flex: isMobile ? undefined : '0 0 auto'
          }}
        >
          {/* Filtro por categoría */}
          <FormControl size="small" sx={{ minWidth: 140, flex: isMobile ? 1 : undefined }}>
            <InputLabel id="category-select-label">Categoría</InputLabel>
            <Select
              labelId="category-select-label"
              value={currentFilters.category || ''}
              label="Categoría"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">
                <em>Todas</em>
              </MenuItem>
              {availableCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Filtro por dificultad */}
          <FormControl size="small" sx={{ minWidth: 140, flex: isMobile ? 1 : undefined }}>
            <InputLabel id="difficulty-select-label">Dificultad</InputLabel>
            <Select
              labelId="difficulty-select-label"
              value={currentFilters.difficulty || ''}
              label="Dificultad"
              onChange={handleDifficultyChange}
            >
              <MenuItem value="">
                <em>Todas</em>
              </MenuItem>
              <MenuItem value="Principiante">Principiante</MenuItem>
              <MenuItem value="Intermedio">Intermedio</MenuItem>
              <MenuItem value="Avanzado">Avanzado</MenuItem>
            </Select>
          </FormControl>

          {/* Toggle de favoritos */}
          <ToggleButton
            value="favorite"
            selected={currentFilters.favoriteFilter !== 'all'}
            onChange={handleFavoriteToggle}
            color={getFavoriteColor()}
            size="small"
            aria-label="Filtrar favoritos"
            sx={{ flexShrink: 0 }}
          >
            {renderFavoriteIcon()}
          </ToggleButton>

          {/* Toggle de vista */}
          <ToggleButtonGroup
            value={currentViewMode}
            exclusive
            onChange={handleViewModeChange}
            size="small"
            aria-label="Modo de vista"
            sx={{ flexShrink: 0 }}
          >
            <ToggleButton value="single" aria-label="Vista de una columna">
              <ViewColumnIcon />
            </ToggleButton>
            <ToggleButton value="double" aria-label="Vista de dos columnas">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Botón limpiar filtros (solo si hay filtros activos) */}
          {hasActiveFilters && (
            <Button
              variant="outlined"
              size="small"
              onClick={handleClearFilters}
              startIcon={<FilterListOffIcon />}
              sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              Limpiar
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ExerciseFilter;