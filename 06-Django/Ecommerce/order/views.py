from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from product.models import Product
from .serializers import *
from rest_framework import permissions
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics
from .models import Order
from app.permissions import IsAdminOrReadOnly, IsOwnerOrAdminOrReadOnly
# Create your views here.

class OrderListCreateView(APIView):
    
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
            request_body = OrderSerializer,
            responses = {201:OrderSerializer}
    )
    def post(self,request):

        data = request.data.copy()
        product_id = data.get("product")
        data["customer"] = request.user.id

        product = get_object_or_404(Product,pk=product_id)

        if product.stock <= 0:
            return Response({"detail":"Product out of stock"},status = 400)
        
        serializer = OrderSerializer(data = data)

        serializer.is_valid(raise_exception=True)
        serializer.save()
        order = get_object_or_404(Order, pk = serializer.data['id'])
        response_serializer = OrderSerializerDetail(order)
        return Response(response_serializer.data, status=201)

    def get(self,request):
        queryset = None

        if not getattr(request.user, "is_admin", False):
            queryset = request.user.orders.all()
        else:
            queryset = Order.objects.all()

            customer = request.GET.get("customer")      
            if customer:
                queryset = queryset.filter(customer=customer)

        product = request.GET.get("product")

        if product:
            queryset = queryset.filter(product=product)

        serializer = OrderSerializerDetail(queryset, many=True)
        return Response({
                "total_orders":queryset.count(),
                "orders":serializer.data
                }, 
            status=200
            )

class OrderCancel(APIView):
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdminOrReadOnly]

    @swagger_auto_schema(request_body=None)
    def patch(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"detail": "Order not found"}, status=404)

        self.check_object_permissions(request, order)

        if order.status != "pending":
            return Response(
                {"detail": "Only pending orders can be cancelled"},
                status=400
            )

        serializer = OrderSerializerDetail(
            order,
            data={"status": "cancelled"},
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=200)

   

class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    permission_classes = [permissions.IsAuthenticated,IsAdminOrReadOnly ]
    serializer_class = OrderSerializerDetail
    




