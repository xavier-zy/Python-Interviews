package Command;

public class BuyStock implements Order {
    private Stock abcStock;

    @Override
    public void excute() {
        abcStock.sell();
    }

    public BuyStock(Stock abcStock) {
        this.abcStock = abcStock;
    }
}
