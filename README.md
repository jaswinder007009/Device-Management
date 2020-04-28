# Device Management

[Database:](https://github.com/kaustubh-ex2/device_schema/tree/DM-15)

## Endpoints for Admin Dashboard

1. GET /api/dashboard/device/count
2. GET /api/dashboard/requests/accepted
3. GET /api/dashboard/requests/rejected
4. GET /api/dashboard/requests/pending
5. GET /api/dashboard/device/faults

## Endpoints

### Request

1. POST `/request`
2. GET `/request/pending?search={searchField}&sort={sortField}&direction={sortDirection}`
    * Returns all pending requests (meant to be used by admin)
3. GET `/request/{requestId}/reject`
4. DELETE `/request/{requestId}/cancel`
5. GET `/request/{requestId}/accept`

### Return

1. GET `/api/requesthistory/{assignedId}/accept`

### User Dashboard

1. GET `/api/dashboard/device/count`
2. GET `/api/dashboard/{email}/devices/returndates`

### User Request History

1. GET `/api/device/current_device/{userId}`
2. GET `/api/device/previous_device/{userId}`

### User

1. GET `api/user`
2. GET `api/user/{user_id}`
3. GET `api/user?searchby=[column_name]&?sortby=[column_name]`
4. GET `api/user/{user_id}/remove`
5. POST `api/user/add`
6. PUT `api/user/{user_id}/update`

### Security

1. Use the `[Authorize]` attribute for the route the need to be secured (i.e your routes need a token to be accessed)

Eg.
```cs

[Authorize]
[HttpGet]
public IActionResult MethodName(){}
```

2. You can use the `[Authorize]` attribute on the controller itself to secure all routes in the controller

Eg.
```cs

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ControllerName(){}
```

3. Use the `Roles` attribute along with Authorize if the route needs role specification

Eg.
```cs

[Authorize(Roles="admin")]
[HttpGet]
public IActionResult MethodName(){}
```

4. Use the `[PermissionAuthorize(Permission="<PERMISSION NAME>,<ANOTHER PERMISSION>")]` attribute to secure your routes based on permissions

Eg.
```cs

[PermissionAuthorize(Permission="read_all_users")]
[HttpGet]
public IActionResult MethodName(){}
```

**NOTE** PermissionAuthorize can be used alongside with the Authorize attribute. If used together, it would require both conditions to be fulfilled.

Roles supported currently are *admin*, *user*, *superadmin*

#### Reading data from token

Step 1. Inherit your controller from BaseController class (*present in Utilities/*)

Step 2. Refer [this file on using the methods](https://github.com/rishikant05/Device-Management/blob/cc526302d41d36bbd1749c5c233d99565a6826ba/dm-backend/Controllers/UserController.cs#L21)

### Webpack

The file inside `data-main` attribute is now under `entry` property in [*webpack.config.js*](https://github.com/rishikant05/Device-Management/blob/frontend-with-webpack/dm-frontend/webpack.config.js)
and the new way to use the script in html is `<script src="/assets/js/<filename>.js"></script>`

While developing a new page don't forget to add your file in the entry object in [*webpack.config.js*](https://github.com/rishikant05/Device-Management/blob/frontend-with-webpack/dm-frontend/webpack.config.js) file.

#### Usage

Navigate to *dm-frontend/* and run `npm install`

After installation finishes, run `npm run dev`. This starts the webpack watch-*like* server.

**NOTE** From now on please do not ignore ts errors. Webpack does not compile without error-free typescript.
