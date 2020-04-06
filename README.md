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

1. POST `/api/request`
2. GET `/api/request/pending?search={searchField}&sort={sortField}&direction={sortDirection}`
    * Returns all pending requests (meant to be used by admin)
3. GET `/api/request/{requestId}/reject`
4. DELETE `/api/request/{requestId}/cancel`
5. GET `/api/request/{requestId}/accept`

### Return

1. GET `/api/requesthistory/{assignedId}/accept`

### User Dashboard:

1. GET `/api/dashboard/device/count`
2. GET `/api/dashboard/{email}/devices/returndates`

### User Request History

1. GET `/api/device/current_device/{userId}`
2. GET `/api/device/previous_device/{userId}`


### User

# Get All Device
api/user

# Get User By ID
api/user/[user_id]

# Add User
api/user/add

# Remove User
api/user/[user_id]/remove

# Update User
api/user/[user_id]/update

# Searching for a specific field
api/user?searchby=[column_name]

# Sorting in a specific field
api/user?sortby=[column_name]

# Searching and sorting together
api/user?sortby=[column_name]&searchby=[coumn_name]
