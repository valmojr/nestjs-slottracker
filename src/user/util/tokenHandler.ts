export default function TokenHandler(sid: string) {
  sid = decodeURIComponent(sid);
  sid = sid.split(':')[1].split('.')[0];

  return sid;
}
