package Factorys;

public class FactoryProducer {
    public static AbstractFactory getFactory(String choice){
        if(choice.equalsIgnoreCase("SHAPE")){
            return new ShapeFactoryExtendsAF();
        } else if(choice.equalsIgnoreCase("COLOR")){
            return new ColorFactoryExtendsAF();
        }
        return null;
    }
}
