#!/usr/bin/python
import subprocess
import sys

from subprocess import CalledProcessError, check_output

def pcap_funct(pfilter, packets):

  #  try:
  #    output = check_output(["sudo", "./birdseye/src/pcap", pfilter, packets])
  #  except CalledProcessError as e:
  #    print e.returncode
     

    pcapProcess = subprocess.Popen(["sudo", "./birdseye/src/pcap", pfilter, packets],
                  stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print "This was process..." + pfilter + packets
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
    print pcapProcess.returncode
    return listOfIps
