package Filter;

import java.util.ArrayList;
import java.util.List;

public class CriteriaMale implements Criteria {

    @Override
    public List<Person> meetCriteria(List<Person> people) {
        List<Person> malePersons = new ArrayList<>();
        for (Person person : people) {
            if (person.getGender().equalsIgnoreCase("MALE")) {
                malePersons.add(person);
            }
        }

        return malePersons;
    }
}
