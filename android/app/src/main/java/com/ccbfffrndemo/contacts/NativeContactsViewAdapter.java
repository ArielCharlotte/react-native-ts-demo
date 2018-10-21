package com.ccbfffrndemo.contacts;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.ccbfffrndemo.R;

import java.util.List;

/**
 *
 *
 * */
public class NativeContactsViewAdapter extends BaseAdapter {
    Context context;
    List<String> dataSource;

    public NativeContactsViewAdapter(Context context, List<String> dataSource)
    {
        this.context = context;
        this.dataSource = dataSource;
    }

    @Override
    public int getCount() {
        return dataSource.size();
    }

    @Override
    public String getItem(int i) {
        return dataSource.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        if (view == null)
        {
            view = LayoutInflater.from(context).inflate(R.layout.layout_contacts, null);
        }
        TextView tvDesc = (TextView)view.findViewById(R.id.contacter_name);
        tvDesc.setText(getItem(i));
        return view;
    }
}