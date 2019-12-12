package com.example.enrollmentproject;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.enrollmentproject.LIstViewItem;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

public class ListViewAdapter extends BaseAdapter {
    private ArrayList<LIstViewItem> ItemArrayList = new ArrayList<>();
    //ListViewAdapter의 생성자
    public ListViewAdapter(){
    }
    //Adapter에 사용되는 데이터의 개수를 리턴 : 필수 구현

    @Override
    public int getCount() {
        return ItemArrayList.size();
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        final int pos = position;
        final Context context = parent.getContext();
        Log.e("view","출력");
        if(convertView == null){
            LayoutInflater inflater = (LayoutInflater)context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.listview_item,parent,false);
        }
        ImageView iconImageView = (ImageView)convertView.findViewById(R.id.imageView1);
        final TextView titleTextView = (TextView)convertView.findViewById(R.id.textView1);
        final TextView descTextView = (TextView)convertView.findViewById(R.id.textView2);
        final TextView managerView = (TextView)convertView.findViewById(R.id.textView3);
        final TextView enrollmentView = (TextView)convertView.findViewById(R.id.textView4);

        LIstViewItem lIstViewItem = ItemArrayList.get(position);

        iconImageView.setImageDrawable(lIstViewItem.getIconDrawable());
        titleTextView.setText(lIstViewItem.getTitleStr());
        descTextView.setText(lIstViewItem.getDescStr());
        managerView.setText(lIstViewItem.getAdminStr());
        enrollmentView.setText(lIstViewItem.getEnrollStr());

        iconImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MainActivity.JSONTask jsonTask = new MainActivity.JSONTask();
                jsonTask.execute("http://210.119.107.159:9928/warehouse_input");
                Toast.makeText(context,"서버 연결",Toast.LENGTH_SHORT).show();
            }
        });
        /*titleTextView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(context,"선택"+titleTextView.getText().toString(),Toast.LENGTH_SHORT).show();
            }
        });
        descTextView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(context,"선택"+descTextView.getText().toString(),Toast.LENGTH_SHORT).show();
            }
        });
        managerView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(context,"선택"+managerView.getText().toString(),Toast.LENGTH_SHORT).show();
            }
        });*/
        return convertView;
    }


    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public Object getItem(int position) {
        return ItemArrayList.get(position);
    }

    public void addItem(Drawable icon, String title, String desc, String admin,String enroll){
        LIstViewItem item = new LIstViewItem();

        item.setIconDrawable(icon);
        item.setTitleStr(title);
        item.setDescStr(desc);
        item.setAdminStr(admin);
        item.setEnrollStr(enroll);

        ItemArrayList.add(item);
    }
}
