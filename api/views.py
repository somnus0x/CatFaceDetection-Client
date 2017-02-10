from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from detection_service import services as detection_service

@csrf_exempt
def detect(request):
    print("=========Start=======")
    rects = detection_service.detect(request.FILES['file'])
    respData = [];

    for rect in rects:
        respData.append({
            'x': rect[0],
            'y': rect[1],
            'width': rect[2],
            'height': rect[3]
        })
    return JsonResponse(respData, safe=False)
