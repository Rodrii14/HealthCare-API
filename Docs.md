# HealthCare-API

## Video
Information gathered from videos
1. Video Banner
2. Channel Name
3. Channel Photo
4. Video Name (unique field)
5. Video link
6. Video Category
Video methods 
1. Create video: POST  http://localhost:3500/api/video/
2. Get all videos: GET http://localhost:3500/api/video/
3. Get all videos by category: GET http://localhost:3500/api/video/category/:category
4. Get video by id: GET http://localhost:3500/api/video/id/:id

## User
Information gathered from user
1. name
2. email (unique field)
3. age (calculated from date of birth)
4. gender
5. data (height, weight, muscular mass, body fat, cholesterol, blood glucose, blood pressure)
User methods
1. Register user: POST http://localhost:3500/api/auth/
2. Log in user: POST http://localhost:3500/api/auth/login/
3. Update metrics: PATCH http://localhost:3500/api/auth/data/
4. Get metrics: GET http://localhost:3500/api/auth/data/

## Comment
Information necessary to post a comment
1. Authentication
2. Content
3. Date
Comment methods:
1. Create comment: POST http://localhost:3500/api/community/
1.1 To respond a comment just add id field and add the comment's id you want to respond
2. Get all comments: GET http://localhost:3500/api/community/