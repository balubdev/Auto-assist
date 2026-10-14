from rest_framework.views import APIView
from rest_framework.response import Response

from .services import recommend_best_shop


class AIRecommendationView(APIView):

    def get(self, request):

        user_lat = float(request.GET.get("lat"))
        user_lng = float(request.GET.get("lng"))

        recommendations = recommend_best_shop(
            user_lat,
            user_lng
        )

        data = []

        for item in recommendations:

            shop = item["shop"]

            data.append({

                "shop_name": shop.shop_name,
                "city": shop.city,
                "distance": item["distance"],
                "rating": shop.average_rating,
                "queue": shop.current_queue,
                "verified": shop.is_verified,
                "score": item["score"]

            })

        return Response(data)