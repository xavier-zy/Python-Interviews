package NullObject;

public class NullCustomer extends AbstractCustomer {

    @Override
    public Boolean isNil() {
        return true;
    }

    @Override
    public String getName() {
        return "Not Available in Customer Database";
    }
}
