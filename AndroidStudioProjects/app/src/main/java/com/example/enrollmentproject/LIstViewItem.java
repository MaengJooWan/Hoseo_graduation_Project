package com.example.enrollmentproject;

import android.graphics.drawable.Drawable;

public class LIstViewItem {
    private Drawable iconDrawable;
    private String titleStr;
    private String descStr;
    private String adminStr;
    private String enrollStr;

    public void setIconDrawable(Drawable icon){ iconDrawable=icon;}
    public void setTitleStr(String title){titleStr=title;}
    public void setDescStr(String desc){descStr=desc;}
    public void setAdminStr(String admin){adminStr=admin;}
    public void setEnrollStr(String enroll){enrollStr=enroll;}

    public Drawable getIconDrawable(){return this.iconDrawable;}
    public String getTitleStr(){return  this.titleStr;}
    public String getDescStr(){return this.descStr;}
    public String getAdminStr(){return this.adminStr;}
    public String getEnrollStr(){return this.enrollStr;}
}
