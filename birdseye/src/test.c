#include<pcap.h>

 char *dev = NULL;
 pcap_t *session;	
 struct bpf_program fp;
 bpf_u_int32 mask;
 bpf_u_int32 net;
 char errbuf[200];
 char filter_exp[] = "tcp or ip";
 int num_packets = 10;
 struct pcap_pkthdr header;
 const u_char *packet;

int main() {

  pcap_lookupnet(dev, &net, &mask, errbuf);
  session = pcap_open_live(dev, 1, 1, 1000, errbuf);
  pcap_compile(session, &fp, filter_exp, 0, net);
  pcap_setfilter(session, &fp);
  packet = pcap_next(session,&header);
  printf("Grabbed packet of length %d\n",header.len);
  return 0;

 } 
