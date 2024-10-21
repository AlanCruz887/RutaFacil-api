export const checkRole = (requiredRole) => {
    return (req, res, next) => {
      try {
        // Verificar que el usuario esté autenticado y que su rol esté en el token
        const userRole = req.user.role;
  
        if (!userRole) {
          return res.status(403).json({
            success: false,
            message: 'Role not found, access denied.'
          });
        }
  
        // Verificar si el rol del usuario coincide con el requerido
        if (userRole !== requiredRole) {
          return res.status(403).json({
            success: false,
            message: `Access denied. Only ${requiredRole} can access this resource.`,
          });
        }
  
        next(); // El usuario tiene el rol adecuado, continuar con la ruta
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Error checking role, access denied.',
        });
      }
    };
  };
  