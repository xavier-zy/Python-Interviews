package Momento;

import java.util.ArrayList;
import java.util.List;

public class CareTaker {
    private List<Momento> momentoList = new ArrayList<Momento>();

    public void add(Momento momento) {
        momentoList.add(momento);
    }

    public Momento get(int index) {
        return momentoList.get(index);
    }
}
