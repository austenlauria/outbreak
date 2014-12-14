#!/usr/bin/python
import subprocess
import sys


# Wrapper used in front end Ajax call.
# Takes in filter, packet number and whether it is being called
# from a test or not. It then calls the pcap executable
# with command line arguments.
# Returns a string of comma delimited ips if from user
# Else returns exit value for testing.
def pcap_funct(pfilter, packets, test):

    if pfilter == "null":
        pfilter = ""

    # Run the pcap executable with cmmd args, equivalent to typing:
    # sudo ./pcap "_Filter" _numPackets test
    # on command line from src directory.
    pcapProcess = subprocess.Popen(["sudo", "./birdseye/src/pcap", pfilter, packets, test],
                  stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    listOfIps = []
    i = 0

    # Grab the stdout of the pcap program and insert it into array.
    while True:
        nextLine = pcapProcess.stdout.readline()
        listOfIps.insert(i, nextLine)
        if nextLine == '' and pcapProcess.poll() is not None:
            break
        sys.stdout.write(nextLine)
        sys.stdout.flush()
        i += 1

    if test == "0":
        return listOfIps
    else:
        return pcapProcess.returncode
