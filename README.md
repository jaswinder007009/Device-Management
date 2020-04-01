# Device Management

Database dump can [be found here](https://github.com/KhushiSarkari/db-schema)

## Endpoints

### Request

1. POST `/api/request`
2. GET `/api/request/pending`
    * Returns all pending requests (meant to be used by admin)
3. GET `/api/request/{requestId}/reject`
4. DELETE `/api/request/{requestId}/cancel`
5. GET `/api/request/{requestId}/accept`

### Return

1. GET `/api/requesthistory/{assignedId}/accept`
