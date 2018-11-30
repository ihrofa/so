//--------------------- Copyright Block ----------------------
/*

PrayTimes.js: Prayer Times Calculator (ver 2.3)
Copyright (C) 2007-2011 PrayTimes.org

Developer: Hamid Zarrabi-Zadeh
License: GNU LGPL v3.0

TERMS OF USE:
  Permission is granted to use this code, with or
  without modification, in any website or application
  provided that credit is given to the original work
  with a link back to PrayTimes.org.

This program is distributed in the hope that it will
be useful, but WITHOUT ANY WARRANTY.

PLEASE DO NOT REMOVE THIS COPYRIGHT BLOCK.

*/
function PrayTimes(t){var i,a,n,r,s,e={MWL:{name:"Muslim World League",params:{fajr:18,isha:17}},ISNA:{name:"Islamic Society of North America (ISNA)",params:{fajr:15,isha:15}},Egypt:{name:"Egyptian General Authority of Survey",params:{fajr:19.5,isha:17.5}},Makkah:{name:"Umm Al-Qura University, Makkah",params:{fajr:18.5,isha:"90 min"}},Karachi:{name:"University of Islamic Sciences, Karachi",params:{fajr:18,isha:18}},Tehran:{name:"Institute of Geophysics, University of Tehran",params:{fajr:17.7,isha:14,maghrib:4.5,midnight:"Jafari"}},Jafari:{name:"Shia Ithna-Ashari, Leva Institute, Qum",params:{fajr:16,isha:14,maghrib:4,midnight:"Jafari"}},KEMENAGRI:{name:"Ditjen Bimas Islam, KEMENAG RI",params:{fajr:19.5,dhuhr:4,maghrib:1.6,asr:1.03,isha:18.5}}},h="KEMENAGRI",u={imsak:"10 min",dhuhr:"0 min",asr:"Standard",highLats:"NightMiddle"},o="24h",f=["am","pm"],m={},c={maghrib:"0 min",midnight:"Standard"};for(var g in e){var d=e[g].params;for(var M in c)void 0===d[M]&&(d[M]=c[M])}d=e[h=e[t]?t:h].params;for(var l in d)u[l]=d[l];for(var g in{imsak:"Imsak",fajr:"Shubuh",sunrise:"Sunrise",dhuhr:"Dhuhr",asr:"Asr",sunset:"Sunset",maghrib:"Maghrib",isha:"Isha",midnight:"Midnight"})m[g]=0;return{setMethod:function(t){e[t]&&(this.adjust(e[t].params),h=t)},adjust:function(t){for(var i in t)u[i]=t[i]},tune:function(t){for(var i in t)m[i]=t[i]},getMethod:function(){return h},getSetting:function(){return u},getOffsets:function(){return m},getDefaults:function(){return e},getTimes:function(t,e,h,u,f){return i=1*e[0],a=1*e[1],n=e[2]?1*e[2]:0,o=f||o,t.constructor===Date&&(t=[t.getFullYear(),t.getMonth()+1,t.getDate()]),void 0!==h&&"auto"!=h||(h=this.getTimeZone(t)),void 0!==u&&"auto"!=u||(u=this.getDst(t)),r=1*h+(1*u?1:0),s=this.julian(t[0],t[1],t[2])-a/360,this.computeTimes()},getFormattedTime:function(t,i,a){if(isNaN(t))return"-----";if("Float"==i)return t;a=a||f,t=DMath.fixHour(t+.5/60);var n=Math.floor(t),r=Math.floor(60*(t-n)),s="12h"==i?a[n<12?0:1]:"";return("24h"==i?this.twoDigitsFormat(n):(n+12-1)%12+1)+":"+this.twoDigitsFormat(r)+(s?" "+s:"")},midDay:function(t){var i=this.sunPosition(s+t).equation;return DMath.fixHour(12-i)},sunAngleTime:function(t,a,n){var r=this.sunPosition(s+a).declination,e=this.midDay(a),h=1/15*DMath.arccos((-DMath.sin(t)-DMath.sin(r)*DMath.sin(i))/(DMath.cos(r)*DMath.cos(i)));return e+("ccw"==n?-h:h)},asrTime:function(t,a){var n=this.sunPosition(s+a).declination,r=-DMath.arccot(t+DMath.tan(Math.abs(i-n)));return this.sunAngleTime(r,a)},sunPosition:function(t){var i=t-2451545,a=DMath.fixAngle(357.529+.98560028*i),n=DMath.fixAngle(280.459+.98564736*i),r=DMath.fixAngle(n+1.915*DMath.sin(a)+.02*DMath.sin(2*a)),s=(DMath.cos(a),DMath.cos(2*a),23.439-3.6e-7*i),e=DMath.arctan2(DMath.cos(s)*DMath.sin(r),DMath.cos(r))/15,h=n/15-DMath.fixHour(e);return{declination:DMath.arcsin(DMath.sin(s)*DMath.sin(r)),equation:h}},julian:function(t,i,a){i<=2&&(t-=1,i+=12);var n=Math.floor(t/100),r=2-n+Math.floor(n/4);return Math.floor(365.25*(t+4716))+Math.floor(30.6001*(i+1))+a+r-1524.5},computePrayerTimes:function(t){t=this.dayPortion(t);var i=u;return{imsak:this.sunAngleTime(this.eval(i.imsak),t.imsak,"ccw"),fajr:this.sunAngleTime(this.eval(i.fajr),t.fajr,"ccw"),sunrise:this.sunAngleTime(this.riseSetAngle(),t.sunrise,"ccw"),dhuhr:this.midDay(t.dhuhr),asr:this.asrTime(this.asrFactor(i.asr),t.asr),sunset:this.sunAngleTime(this.riseSetAngle(),t.sunset),maghrib:this.sunAngleTime(this.eval(i.maghrib),t.maghrib),isha:this.sunAngleTime(this.eval(i.isha),t.isha)}},computeTimes:function(){for(var t={imsak:5,fajr:5,sunrise:6,dhuhr:12,asr:13,sunset:18,maghrib:18,isha:18},i=1;i<=1;i++)t=this.computePrayerTimes(t);return(t=this.adjustTimes(t)).midnight="Jafari"==u.midnight?t.sunset+this.timeDiff(t.sunset,t.fajr)/2:t.sunset+this.timeDiff(t.sunset,t.sunrise)/2,t=this.tuneTimes(t),this.modifyFormats(t)},adjustTimes:function(t){var i=u;for(var n in t)t[n]+=r-a/15;return"None"!=i.highLats&&(t=this.adjustHighLats(t)),this.isMin(i.imsak)&&(t.imsak=t.fajr-this.eval(i.imsak)/60),this.isMin(i.maghrib)&&(t.maghrib=t.sunset+this.eval(i.maghrib)/60),this.isMin(i.isha)&&(t.isha=t.maghrib+this.eval(i.isha)/60),t.dhuhr+=this.eval(i.dhuhr)/60,t},asrFactor:function(t){return{Standard:1,Hanafi:2}[t]||this.eval(t)},riseSetAngle:function(){return.833+.0347*Math.sqrt(n)},tuneTimes:function(t){for(var i in t)t[i]+=m[i]/60;return t},modifyFormats:function(t){for(var i in t)t[i]=this.getFormattedTime(t[i],o);return t},adjustHighLats:function(t){var i=u,a=this.timeDiff(t.sunset,t.sunrise);return t.imsak=this.adjustHLTime(t.imsak,t.sunrise,this.eval(i.imsak),a,"ccw"),t.fajr=this.adjustHLTime(t.fajr,t.sunrise,this.eval(i.fajr),a,"ccw"),t.isha=this.adjustHLTime(t.isha,t.sunset,this.eval(i.isha),a),t.maghrib=this.adjustHLTime(t.maghrib,t.sunset,this.eval(i.maghrib),a),t},adjustHLTime:function(t,i,a,n,r){var s=this.nightPortion(a,n),e="ccw"==r?this.timeDiff(t,i):this.timeDiff(i,t);return(isNaN(t)||e>s)&&(t=i+("ccw"==r?-s:s)),t},nightPortion:function(t,i){var a=u.highLats,n=.5;return"AngleBased"==a&&(n=1/60*t),"OneSeventh"==a&&(n=1/7),n*i},dayPortion:function(t){for(var i in t)t[i]/=24;return t},getTimeZone:function(t){var i=t[0],a=this.gmtOffset([i,0,1]),n=this.gmtOffset([i,6,1]);return Math.min(a,n)},getDst:function(t){return 1*(this.gmtOffset(t)!=this.getTimeZone(t))},gmtOffset:function(t){var i=new Date(t[0],t[1]-1,t[2],12,0,0,0),a=i.toGMTString();return(i-new Date(a.substring(0,a.lastIndexOf(" ")-1)))/36e5},eval:function(t){return 1*(t+"").split(/[^0-9.+-]/)[0]},isMin:function(t){return-1!=(t+"").indexOf("min")},timeDiff:function(t,i){return DMath.fixHour(i-t)},twoDigitsFormat:function(t){return t<10?"0"+t:t}}}var DMath={dtr:function(t){return t*Math.PI/180},rtd:function(t){return 180*t/Math.PI},sin:function(t){return Math.sin(this.dtr(t))},cos:function(t){return Math.cos(this.dtr(t))},tan:function(t){return Math.tan(this.dtr(t))},arcsin:function(t){return this.rtd(Math.asin(t))},arccos:function(t){return this.rtd(Math.acos(t))},arctan:function(t){return this.rtd(Math.atan(t))},arccot:function(t){return this.rtd(Math.atan(1/t))},arctan2:function(t,i){return this.rtd(Math.atan2(t,i))},fixAngle:function(t){return this.fix(t,360)},fixHour:function(t){return this.fix(t,24)},fix:function(t,i){return(t-=i*Math.floor(t/i))<0?t+i:t}},prayTimes=new PrayTimes;
