"""
file: geoip_lookup.py
desc: TODO
"""
import geoip2.webservice


def geoip_lookup(ip_list):
    geoip_list = []
    user_id = 96141
    license = 'dpnkKYI2nCCv'

    client = geoip2.webservice.Client(user_id, license)

    if ip_list is None or not ip_list:
        return geoip_list

    for ip in ip_list:
        try:
            response = client.city(ip["ip"])
            geoip = dict(ip)
            geoip["lon"] = response.location.longitude
            geoip["lat"] = response.location.latitude
            geoip["country"] = response.country.name
            geoip["city"] = response.city.name
            geoip_list.append(geoip)
        except ValueError:
            print "caught invalid"

        # r = requests.get("http://freegeoip.net/json/" + ip["ip"])
        # if r.status_code == 404:
        #     continue
        # json_object = json.loads(r.text)
        # geoip = dict(ip)
        # geoip["lon"] = json_object["longitude"]
        # geoip["lat"] = json_object["latitude"]
        # geoip["country"] = json_object["country_name"]
        # geoip["region"] = json_object["region_name"]
        # geoip["city"] = json_object["city"]
        # geoip_list.append(geoip)
    return geoip_list
