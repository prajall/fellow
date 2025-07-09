from rest_framework.response import Response
from rest_framework import status


#  for consistent and clear api response

def apiResponse(status_code,message, data=None ):
    return Response({
        "success":True,
        "message":message,
        "data":data
    },
    status = status_code 
    )

def apiError(status_code,message,error=None ):
    return Response({
        "success":False,
        "message":message,
        "error":error
    },
    status = status_code
    )