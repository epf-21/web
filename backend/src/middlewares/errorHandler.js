export const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err)
  if (err.name === 'AppError') {
    return res.status(err.status).json({
      ok: false,
      message: err.message
    })
  }
  res.status(err.status || 500).json({
    ok: false,
    message: err.message || 'Error interno del servidor'
  })
}
