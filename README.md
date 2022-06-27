# restAPI

# Managed to get this more or less working as a standalone project using Thunder Client. For the backend REST API I had to change a few things so it would comunicate CRUD functions to React, which for some reason didn't necessarily work with it and Thunder Client. If I had any sense I would have created a branch specifically for this task but alas, I yearn to do everything back to front.

# controllers.js - line 80 - Where you see `{ username: req.body.username }`
# This used to be `{ where: { username: req.body.username } }` for Thunder Client


