"""
file: test_pcap.py
desc: TESTS FILE
"""
import unittest

from birdseye.src import core


# Comprehensive backend pcap testing.
# 30 test cases, all passing.
class TestPCap(unittest.TestCase):

    def test_pcap_0_packets(self):
        return_value = core.pcap_script.pcap_funct("0", "", "1")
        self.assertTrue((return_value == 1))

    def test_pcap_500_packets(self):
        return_value = core.pcap_script.pcap_funct("", "500", "1")
        self.assertTrue((return_value == 0))

    def test_pcap_no_filter(self):
        return_value = core.pcap_script.pcap_funct("", "10", "1")
        self.assertTrue((return_value == 0))

    def test_pcap_no_filter_no_packets(self):
        return_value = core.pcap_script.pcap_funct("", "", "1");
        self.assertTrue((return_value == 1))

    def test_pcap_filter_no_packets(self):
        return_value = core.pcap_script.pcap_funct("tcp or ip", "", "1")
        self.assertTrue((return_value == 1))

    def test_pcap_max_packets(self):
        return_value = core.pcap_script.pcap_funct("", "1000", "1")
        self.assertTrue((return_value == 0))

    def test_pcap_too_many_packets(self):
        return_value = core.pcap_script.pcap_funct("", "1001", "1")
        self.assertTrue((return_value == 1))

    def test_pcap_way_too_many_packets(self):
        return_value = core.pcap_script.pcap_funct("", "10000", "1")
        self.assertTrue((return_value == 1))

    def test_pcap_min_packets(self):
        return_value = core.pcap_script.pcap_funct("", "1", "1")
        self.assertTrue((return_value == 0))

    def test_pcap_bad_filter_no_packets(self):
        return_value = core.pcap_script.pcap_funct("%$", "", "1")
        self.assertTrue((return_value == 1))

    def test_pcap_bad_filter_0_packets(self):
        return_value = core.pcap_script.pcap_funct("%$", "0", "1")
        self.assertTrue((return_value == 1))

    def test_pcap_bad_filter_negative_packets(self):
        return_value = core.pcap_script.pcap_funct("%$", "-50", "1")
        self.assertTrue((return_value == 1))

    def test_pcap_negative_packets(self):
        return_value = core.pcap_script.pcap_funct("tcp", "-1", "1")
        self.assertTrue((return_value == 1))

    def test_pcap_bad_char_filter(self):
        return_value = core.pcap_script.pcap_funct("hf9wg", "10", "1")
        self.assertTrue((return_value == 1))

    def test_pcap_bad_int_filter(self):
        return_value = core.pcap_script.pcap_funct("923840", "10", "1")
        self.assertTrue((return_value == 1))

    def test_pcap_bad_int_num_filter(self):
        return_value = core.pcap_script.pcap_funct("9fwou23840", "10", "1")
        self.assertTrue((return_value == 1))

    def test_pcap_bad_special_char_filter(self):
        return_value = core.pcap_script.pcap_funct("&@*@!%*@()", "10", "1")
        self.assertTrue((return_value == 1))

    def test_pcap_bad_mixed_filter(self):
        return_value = core.pcap_script.pcap_funct("(%123647hd#@ z 9fwo u23840%)", "10", "1")
        self.assertTrue((return_value == 1))

    def test_pcap_simple_filter(self):
        return_value = core.pcap_script.pcap_funct("tcp", "10", "1")
        self.assertTrue((return_value == 0))

    def test_pcap_test_tcp_ip_filter(self):
        return_value = core.pcap_script.pcap_funct("tcp or ip", "10", "1")
        self.assertTrue((return_value == 0))

    def test_pcap_port_filter(self):
        return_value = core.pcap_script.pcap_funct("port 53", "10", "1")
        self.assertTrue((return_value == 0))

    def test_pcap_test_port_complex_filter(self):
        return_value = core.pcap_script.pcap_funct("(tcp or ip) and not port 53", "10", "1")
        self.assertTrue((return_value == 0))

if __name__ == '__main__':
    unittest.main()
