import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  FilterListOff as FilterListOffIcon,
  HeartBroken as HeartBrokenIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  ViewColumn as ViewColumnIcon,
  ViewModule as ViewModuleIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { DEFAULT_FILTERS, DIFFICULTY_OPTIONS, SEARCH_DEBOUNCE_MS } from '../../constants/exercise';
import { Exercise, ExerciseFilterProps, FilterState, ViewMode } from '../../types/exercise';

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
  const [searchExpanded, setSearchExpanded] = useState(false); // Estado para expandir búsqueda

  // Debounce effect para la búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput !== currentFilters.searchQuery) {
        onFiltersChange({
          ...currentFilters,
          searchQuery: searchInput
        });
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchInput, currentFilters, onFiltersChange]);

  // Sincronizar searchInput con currentFilters cuando cambie externamente
  useEffect(() => {
    setSearchInput(currentFilters.searchQuery);
    // Expandir automáticamente si hay texto de búsqueda
    if (currentFilters.searchQuery) {
      setSearchExpanded(true);
    }
  }, [currentFilters.searchQuery]);

  // Verificar si hay filtros activos
  const hasActiveFilters = useMemo(() => {
    return (
      currentFilters.searchQuery !== DEFAULT_FILTERS.searchQuery ||
      currentFilters.category !== DEFAULT_FILTERS.category ||
      currentFilters.difficulty !== DEFAULT_FILTERS.difficulty ||
      currentFilters.favoriteFilter !== DEFAULT_FILTERS.favoriteFilter ||
      currentFilters.myExercisesOnly !== DEFAULT_FILTERS.myExercisesOnly
    );
  }, [currentFilters]);

  // Handlers
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }> | { target: { value: unknown } }) => {
    const value = (event.target.value as string);
    onFiltersChange({
      ...currentFilters,
      category: value === '' ? null : value
    });
  };

  const handleDifficultyChange = (event: React.ChangeEvent<{ value: unknown }> | { target: { value: unknown } }) => {
    const value = (event.target.value as string);
    onFiltersChange({
      ...currentFilters,
      difficulty: value === '' ? null : (value as Exercise['difficulty'])
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

  const handleMyExercisesToggle = () => {
    onFiltersChange({
      ...currentFilters,
      myExercisesOnly: !currentFilters.myExercisesOnly
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
    setSearchExpanded(false); // Colapsar búsqueda al limpiar filtros
    onFiltersChange(DEFAULT_FILTERS);
  };

  const handleSearchExpand = () => {
    setSearchExpanded(true);
  };

  const handleSearchCollapse = () => {
    if (!searchInput) { // Solo colapsar si no hay texto de búsqueda
      setSearchExpanded(false);
    }
  };

  // Determinar si la búsqueda debe estar colapsada
  const shouldCollapseSearch = hasActiveFilters && !searchExpanded && !searchInput;

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
          borderRadius: theme.vars?.shape?.borderRadius || theme.shape.borderRadius,
          backgroundColor: theme.vars?.palette.background.paper || theme.palette.background.paper,
          boxShadow: theme.shadows[1],
          width: '100%'
        }}
      >
        {/* Contenedor principal para desktop */}
        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={2}
          alignItems={isMobile ? 'stretch' : 'center'}
          sx={{ width: '100%' }}
        >
          {/* Sección izquierda: Barra de búsqueda */}
          <Box sx={{
            flex: isMobile ? undefined : 1,
            minWidth: 0, // Permite que se encoja
            transition: 'all 0.3s ease-in-out'
          }}>
            {shouldCollapseSearch ? (
              // Versión colapsada - solo ícono
              <Button
                onClick={handleSearchExpand}
                size="small"
                variant="outlined"
                sx={{
                  minWidth: 40,
                  width: 40,
                  height: 40,
                  p: 0,
                  flexShrink: 0,
                  transition: 'all 0.3s ease-in-out'
                }}
                aria-label="Expandir búsqueda"
              >
                <SearchIcon />
              </Button>
            ) : (
              // Versión expandida - campo completo
              <TextField
                fullWidth
                sx={{
                  transition: 'all 0.3s ease-in-out'
                }}
                placeholder="Buscar ejercicios..."
                value={searchInput}
                onChange={handleSearchChange}
                onBlur={handleSearchCollapse}
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
                autoFocus={searchExpanded}
              />
            )}
          </Box>

          {/* Sección central: Filtros con transición suave */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              flex: isMobile ? undefined : '0 0 auto',
              transition: 'transform 0.3s ease-in-out, margin 0.3s ease-in-out',
              transform: hasActiveFilters ? 'translateX(-10px)' : 'translateX(0)',
              marginRight: hasActiveFilters ? '10px' : '0'
            }}
          >
            {/* Filtro por categoría */}
            <FormControl
              size="small"
              sx={{
                minWidth: 140,
                flex: isMobile ? 1 : undefined,
                transition: 'all 0.3s ease-in-out'
              }}
            >
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
                {availableCategories.map((category: string) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Filtro por dificultad */}
            <FormControl
              size="small"
              sx={{
                minWidth: 140,
                flex: isMobile ? 1 : undefined,
                transition: 'all 0.3s ease-in-out'
              }}
            >
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
                {DIFFICULTY_OPTIONS.map((difficulty) => (
                  <MenuItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </MenuItem>
                ))}
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
              sx={{
                flexShrink: 0,
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {renderFavoriteIcon()}
            </ToggleButton>

            {/* Toggle de mis ejercicios */}
            <ToggleButton
              value="myExercises"
              selected={currentFilters.myExercisesOnly}
              onChange={handleMyExercisesToggle}
              color={currentFilters.myExercisesOnly ? 'primary' : 'standard'}
              size="small"
              aria-label="Filtrar mis ejercicios"
              sx={{
                flexShrink: 0,
                transition: 'all 0.3s ease-in-out'
              }}
            >
              <PersonIcon />
            </ToggleButton>

            {/* Toggle de vista */}
            <ToggleButtonGroup
              value={currentViewMode}
              exclusive
              onChange={handleViewModeChange}
              size="small"
              aria-label="Modo de vista"
              sx={{
                flexShrink: 0,
                transition: 'all 0.3s ease-in-out'
              }}
            >
              <ToggleButton value="single" aria-label="Vista de una columna">
                <ViewColumnIcon />
              </ToggleButton>
              <ToggleButton value="double" aria-label="Vista de dos columnas">
                <ViewModuleIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {/* Sección derecha: Botón limpiar filtros con animación de entrada/salida */}
          {!isMobile && (
            <Box
              sx={{
                position: 'relative',
                width: hasActiveFilters ? 'auto' : 0,
                overflow: 'hidden',
                transition: 'width 0.3s ease-in-out, opacity 0.3s ease-in-out',
                opacity: hasActiveFilters ? 1 : 0
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={handleClearFilters}
                startIcon={<FilterListOffIcon />}
                sx={{
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  minWidth: 'auto',
                  transition: 'all 0.3s ease-in-out',
                  transform: hasActiveFilters ? 'translateX(0)' : 'translateX(20px)'
                }}
              >
                Limpiar
              </Button>
            </Box>
          )}

          {/* En móvil, mostrar botón debajo de los filtros */}
          {isMobile && hasActiveFilters && (
            <Button
              variant="outlined"
              size="small"
              onClick={handleClearFilters}
              startIcon={<FilterListOffIcon />}
              fullWidth
              sx={{
                mt: 1,
                transition: 'all 0.3s ease-in-out'
              }}
            >
              Limpiar filtros
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ExerciseFilter;