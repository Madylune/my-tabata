export const getDevice = () => {
  if (window.innerWidth > 1024) return 'desktop'
  if (window.innerWidth < 1024 && window.innerWidth > 767) return 'tablet'
  if (window.innerWidth < 767) return 'mobile'
}