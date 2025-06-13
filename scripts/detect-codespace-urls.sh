#!/bin/bash
# scripts/detect-codespace-urls.sh

# Detectar si estamos en Codespaces
if [ -n "$CODESPACE_NAME" ]; then
    echo "🚀 Detectado GitHub Codespaces: $CODESPACE_NAME"
    
    # Construir URL del backend
    BACKEND_URL="https://${CODESPACE_NAME}-8000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
    FRONTEND_URL="https://${CODESPACE_NAME}-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
    
    echo "🔗 Backend URL: $BACKEND_URL"
    echo "🔗 Frontend URL: $FRONTEND_URL"
    
    # Escribir al archivo .env.local
    cat > .env.local << EOF
# Configuración automática para GitHub Codespaces
# Generado el $(date)

# 🌐 API Configuration
NEXT_PUBLIC_API_URL=${BACKEND_URL}/api
NEXT_PUBLIC_API_BASE_URL=${BACKEND_URL}/api

# 🎭 Mock Configuration
NEXT_PUBLIC_USE_MOCK=false

# 🔧 Codespaces Configuration
NEXT_PUBLIC_CODESPACE_NAME=${CODESPACE_NAME}
NEXT_PUBLIC_FRONTEND_URL=${FRONTEND_URL}
NEXT_PUBLIC_BACKEND_URL=${BACKEND_URL}

# 🐛 Debug Configuration
NEXT_PUBLIC_ENV=codespaces
NEXT_PUBLIC_DEBUG_MODE=true
EOF

    echo "✅ Archivo .env.local actualizado"
    echo "📋 Contenido:"
    cat .env.local
    
else
    echo "📍 Configuración para desarrollo local"
    
    cat > .env.local << EOF
# Configuración para desarrollo local

# 🌐 API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# 🎭 Mock Configuration
NEXT_PUBLIC_USE_MOCK=false

# 🐛 Debug Configuration
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_DEBUG_MODE=true
EOF

    echo "✅ Configuración local aplicada"
fi
