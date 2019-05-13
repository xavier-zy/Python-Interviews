package Command;

import java.util.ArrayList;
import java.util.List;

public class Broker {
    private List<Order> orders = new ArrayList<>();

    public void placeOrders() {
        for (Order order : orders) {
            order.excute();
        }
        orders.clear();
    }

    public void takeOrder(Order order) {
        orders.add(order);
    }
}
