#!/usr/bin/python
import subprocess
import sys

from subprocess import check_output


def pcap_funct(pfilter, packets, test):

    if pfilter == "null":
        pfilter = ""
    
    pcapProcess = subprocess.Popen(["sudo", "./birdseye/src/pcap", pfilter, packets, test],
                                    stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    listOfIps = []
    i = 0
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
