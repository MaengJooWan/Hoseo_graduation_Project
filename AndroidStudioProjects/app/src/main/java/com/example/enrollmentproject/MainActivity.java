package com.example.enrollmentproject;

import android.app.Activity;
import android.os.AsyncTask;
import android.os.Handler;
import android.os.Message;
import android.os.RemoteException;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import org.altbeacon.beacon.Beacon;
import org.altbeacon.beacon.BeaconConsumer;
import org.altbeacon.beacon.BeaconManager;
import org.altbeacon.beacon.BeaconParser;
import org.altbeacon.beacon.RangeNotifier;
import org.altbeacon.beacon.Region;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.Socket;
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MainActivity extends AppCompatActivity implements BeaconConsumer {
    private static  TextView Databox;
    private BeaconManager beaconManager;
    //감지된 비콘들을 임시로 담을 리스트
    private List<Beacon> beaconList= new ArrayList<>();
    static String uuid_id;//비콘 uuid
    static Object Fname;//과일 이름
    static Object Fnumber;//과일 수량
    static Object Ftime;//과일 입고 날짜
    static Object Admin;//관리자 이름
    static Object Enroll;//등록여부
    static int dec;
    static List<Integer> count=new ArrayList<>();//등록여부 확인 변수
    //private int i=0;
    private Socket socket;//소켓생성
    BufferedReader in;//서버로부터 온 데이터를 읽는다.
    PrintWriter out;//서버에 데이터를 전송한다.
    EditText input;//화면구성
    Button button;//화면구성
    TextView output;//화면구성
    String data;//


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //비콘 부분
        //비콘 탐지 위한 매니저 초기화
        beaconManager = BeaconManager.getInstanceForApplication(this);

        beaconManager.getBeaconParsers().add(new BeaconParser().setBeaconLayout("m:2-3=0215,i:4-19,i:20-21,i:22-23,p:24-24,d:25-25"));
        //비콘 탐지 시작한다. 실제로 서비스를 시작하는 곳.
        beaconManager.bind(this);

        //서버 통신 부분
        Databox=(TextView)findViewById(R.id.textView);
        handler.sendEmptyMessage(0);

        /*Button button = (Button)findViewById(R.id.testButton);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.e("1","1");
            }
        });*/
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        beaconManager.unbind(this);
    }

    @Override
    public void onBeaconServiceConnect() {
        beaconManager.setRangeNotifier(new RangeNotifier() {
            @Override
            //비콘이 감지되면 해당 함수 호출
            public void didRangeBeaconsInRegion(Collection<Beacon> beacons, Region region) {
                if(beacons.size()>0){
                    beaconList.clear();
                    for(Beacon beacon : beacons){
                        beaconList.add(beacon);
                        count.add(1);
                    }
                }
            }
        });
        try{
            beaconManager.startRangingBeaconsInRegion(new Region("myRangingUniqueId", null, null, null));
        }catch (RemoteException e){
        }
    }

    Handler handler = new Handler() {
        public void handleMessage(Message msg) {
            Log.e("2","2");
            //Toast.makeText(MainActivity.this,"핸들러 들어옴",Toast.LENGTH_LONG).show();
            ListView listView;
            ListViewAdapter adapter;
            TextView textView;
            adapter = new ListViewAdapter();
            listView = (ListView) findViewById(R.id.listview1);
            listView.setAdapter(adapter);
            textView = (TextView) findViewById(R.id.textView);

            //test용 강제 삽입입
            /*Fname = "키위";
            Fnumber = "100";
            Ftime = "2019-05-27";
            Admin = "민수";
            Enroll="등록안됨";
            adapter.addItem(getResources().getDrawable(R.drawable.kiwi),Fname.toString(),Fnumber.toString(),Admin.toString(),Enroll.toString());*/
            //new JSONTask().execute("http://210.119.107.159:9928/warehouse_input");
            for (Beacon beacon : beaconList) {
                uuid_id=beacon.getId1().toString();
                String[] uuidlast = uuid_id.split("-");
                String temp=(String)uuidlast[4];
                temp=temp.trim();
                temp=temp.substring(4,temp.length());
                temp = temp.replaceAll("[^0-9]", "");
                dec = Integer.parseInt(temp, 10);
                uuid_id=String.valueOf(dec);
                Log.e("dec", Integer.toString(dec%4));
                count.set(beaconList.indexOf(beacon),0);
                if(dec%4==3){
                    try{
                        if(count.get(beaconList.indexOf(beacon)) ==0){
                            Fname="사과";
                            Fnumber="";
                            Ftime="2019-05-27";
                            Admin="민수";
                            Enroll="등록여부";
                            count.set(beaconList.indexOf(beacon), 1);
                            adapter.addItem(getResources().getDrawable(R.drawable.apple),Fname.toString(),Fnumber.toString(),Admin.toString(),Enroll.toString());
                        }
                        else{

                        }
                        //new JSONTask().execute("http://210.119.107.159:9928/warehouse_input");//url 주소 입력
                    }catch (ArithmeticException E){
                        continue;
                    }
                }
                else if(dec%4==2){
                    try{
                        if(count.get(beaconList.indexOf(beacon)) ==0){
                            Fname="바나나";
                            Fnumber="";
                            Ftime="2019-05-27";
                            Admin="민수";
                            Enroll="등록여부";
                            count.set(beaconList.indexOf(beacon), 1);
                            adapter.addItem(getResources().getDrawable(R.drawable.banana),Fname.toString(),Fnumber.toString(),Admin.toString(),Enroll.toString());
                        }
                        //new JSONTask().execute("http://210.119.107.159:9928/warehouse_input");//url 주소 입력
                    }catch (ArithmeticException E){
                        continue;
                    }
                }
                else if(dec%4==1){
                    try{
                        if(count.get(beaconList.indexOf(beacon)) ==0) {
                            Log.e("if문","키위");
                            Fname = "키위";
                            Fnumber = "100";
                            Ftime = "2019-05-27";
                            Admin = "민수";
                            Enroll="등록여부";
                            count.set(beaconList.indexOf(beacon), 1);
                            adapter.addItem(getResources().getDrawable(R.drawable.kiwi),Fname.toString(),Fnumber.toString(),Admin.toString(),Enroll.toString());
                        }
                        //new JSONTask().execute("http://210.119.107.159:9928/warehouse_input");//url 주소 입력
                    }catch (ArithmeticException E){
                        continue;
                    }
                }
                else if(dec%4==0){
                    try{
                        if(count.get(beaconList.indexOf(beacon)) ==0) {
                            Fname = "딸기";
                            Fnumber = "";
                            Ftime = "2019-05-27";
                            Admin = "민수";
                            Enroll="등록여부";
                            count.set(beaconList.indexOf(beacon), 1);
                            adapter.addItem(getResources().getDrawable(R.drawable.strawberry),Fname.toString(),Fnumber.toString(),Admin.toString(),Enroll.toString());
                        }
                        //new JSONTask().execute("http://210.119.107.159:9928/warehouse_input");//url 주소 입력
                    }catch (ArithmeticException E){
                        continue;
                    }
                }
            }
            handler.sendEmptyMessageDelayed(0,5000);
        }
    };

    //서버
    public static class JSONTask extends AsyncTask<String,String,String>{

    @Override
    protected String doInBackground(String... urls) {
        try {

            Log.e("3","3");
            JSONObject jsonObject = new JSONObject();
            //jsonObject.accumulate("UUID",uuid_id);

            Log.e("test", Fname.toString());

            jsonObject.accumulate("FNAME",Fname);
            jsonObject.accumulate("FNUMBER",Fnumber);
            jsonObject.accumulate("TIME",Ftime);
            jsonObject.accumulate("Admin",Admin);

            /*jsonObject.accumulate("FNAME","사과");
            jsonObject.accumulate("FNUMBER","100");
            jsonObject.accumulate("TIME","2019-05-27");
            jsonObject.accumulate("Admin","민수");
*/
            HttpURLConnection connection = null;
            BufferedReader reader = null;
            try{
                URL url = new URL(urls[0]);
                //연결
                connection = (HttpURLConnection) url.openConnection();
                //post 방식으로 보냄
                connection.setRequestMethod("POST");
                //캐시 설정
                connection.setRequestProperty("Cache-Control","no-cache");
                connection.setRequestProperty("Content-Type","application/json");
                connection.setRequestProperty("Accept","text/html");
                connection.setDoOutput(true);
                connection.setDoInput(true);
                connection.connect();
                //서버로 보내기 위해 스트림 만드는 부분
                OutputStream outputStream=connection.getOutputStream();
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream));
                writer.write(jsonObject.toString());
                writer.flush();
                writer.close();
                //서버로부터 데이터 받는 곳
                InputStream stream = connection.getInputStream();
                reader=new BufferedReader(new InputStreamReader(stream));
                StringBuffer buffer = new StringBuffer();
                String line="";
                while((line=reader.readLine())!=null){
                    buffer.append(line);
                }
                return buffer.toString();
            }catch (MalformedURLException e){
                e.printStackTrace();
            }catch (IOException e){
                e.printStackTrace();
            }finally {
                //종료가 되면 disconnect 메소드를 호출한다
                    if(connection!=null){
                        connection.disconnect();
                    }
                    try {
                        //버퍼를 닫아준다.
                        if(reader!=null){
                            reader.close();
                        }
                    }catch (IOException e){
                        e.printStackTrace();
                    }
                }//finally 부분
            }catch (Exception e) {
            e.printStackTrace();
        }
        return null;
        }

    @Override
    protected void onPostExecute(String result) {
        super.onPostExecute(result);
        Databox.setText(result);
    }
    }
}

