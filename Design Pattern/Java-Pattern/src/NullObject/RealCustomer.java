package NullObject;

public class RealCustomer extends AbstractCustomer {
    private String name;

    public RealCustomer(String name) {
        this.name = name;
    }

    @Override
    public Boolean isNil() {
        return false;
    }

    @Override
    public String getName() {
        return name;
    }
}
