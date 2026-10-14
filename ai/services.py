from math import radians, sin, cos, sqrt, atan2
from repairshops.models import RepairShop


def calculate_distance(lat1, lon1, lat2, lon2):
    earth_radius_km = 6371.0088

    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)

    a = (
        sin(dlat / 2) ** 2 +
        cos(radians(lat1)) *
        cos(radians(lat2)) *
        sin(dlon / 2) ** 2
    )
    a = min(1.0, max(0.0, a))

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return earth_radius_km * c


def calculate_ai_score(shop, distance):

    score = 0

    # ⭐ Rating (40 Marks)
    score += float(shop.average_rating) * 8

    # 📍 Distance (30 Marks)
    score += max(0, 30 - distance)

    # 🚗 Queue (20 Marks)
    score += max(0, 20 - shop.current_queue)

    # ✅ Verified Shop (10 Marks)
    if shop.is_verified:
        score += 10

    return round(score, 2)


def recommend_best_shop(user_lat, user_lng):

    shops = RepairShop.objects.all()

    recommendations = []

    for shop in shops:

        distance = calculate_distance(
            user_lat,
            user_lng,
            float(shop.latitude),
            float(shop.longitude)
        )

        score = calculate_ai_score(shop, distance)

        recommendations.append({
            "shop": shop,
            "distance": distance,
            "score": score
        })

    recommendations.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return recommendations