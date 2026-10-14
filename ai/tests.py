from django.test import SimpleTestCase

from .services import calculate_distance


class CalculateDistanceTests(SimpleTestCase):
	def test_one_degree_of_longitude_at_equator(self):
		distance = calculate_distance(0, 0, 0, 1)

		self.assertAlmostEqual(distance, 111.195, places=3)

	def test_preserves_distances_smaller_than_one_hundredth_kilometer(self):
		distance = calculate_distance(0, 0, 0, 0.00001)

		self.assertAlmostEqual(distance, 0.00111195, places=7)
