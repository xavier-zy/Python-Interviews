package Command;

public class SellStock implements Order {
    private Stock abcStock;

    @Override
    public void excute() {
        abcStock.buy();
    }

    public SellStock(Stock abcStock) {
        this.abcStock = abcStock;
    }
}
