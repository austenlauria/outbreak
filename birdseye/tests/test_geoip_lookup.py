"""
file: test_geoip_lookup.py
desc: TODO
"""

import unittest, json
from birdseye.src import core


class TestGeoIP(unittest.TestCase):
    def setUp(self):
        self.invalid_list = [
            { "ip": "invalid_ip_xyz" },
            { "ip": "herpaderpa_imaIP" }
        ]
        self.somevalid_list = [
            { "ip": "123ipyoup" },
            { "ip": "8.8.8.8" }
        ]
        self.valid_list = [
            { "ip": "8.8.8.8" },
            { "ip": "198.41.208.143" }
        ]
        self.base_url = "http://freegeoip.net/json/"
        self.empty_geoip = json.dumps({
            "longitude": "",
            "latitude": "",
            "country_name": "",
            "region_name": "",
            "city": ""
        })

    def test_none_ip_list(self):
        ret = core.geoip.geoip_lookup(None)
        self.assertTrue(ret == [])

    def test_empty_ip_list(self):
        ret = core.geoip.geoip_lookup([])
        self.assertTrue(ret == [])

    def test_invalid_ip_list(self):

        ret = core.geoip.geoip_lookup(self.invalid_list)

        self.assertTrue(ret == [])

    def test_somevalid_ip_list(self):
        ret = core.geoip.geoip_lookup(self.somevalid_list)

        self.assertTrue(len(ret) == 1)

    def test_valid_ip_list(self):

        ret = core.geoip.geoip_lookup(self.valid_list)

        self.assertTrue(len(ret) == 2)


if __name__ == "__main__":
    unittest.main()
