import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  const path = c.req.param('path')
  return c.render(
    <div>
      <h1>dynamic path: {path}</h1>
    </div>
  )
})
