interface TrafficLightState {

    void next(TrafficLight light);

    String getColor();
}

class RedLight implements TrafficLightState {

    @Override
    public void next(TrafficLight light) {
        light.setState(new GreenLight());
    }

    @Override
    public String getColor() {
        return "Red";
    }
}

class GreenLight implements TrafficLightState {

    @Override
    public void next(TrafficLight light) {
        light.setState(new YellowLight());
    }

    @Override
    public String getColor() {
        return "Green";
    }
}

class YellowLight implements TrafficLightState {

    @Override
    public void next(TrafficLight light) {
        light.setState(new RedLight());
    }

    @Override
    public String getColor() {
        return "Yellow";
    }
}

class TrafficLight {

    private TrafficLightState state;

    public TrafficLight() {
        state = new RedLight();
    }

    public void change() {
        state.next(this);
    }

    public void setState(TrafficLightState state) {
        this.state = state;
    }

    public String getColor() {
        return state.getColor();
    }
}

public class Main {

    public static void main(String[] args) {

        TrafficLight light = new TrafficLight();

        System.out.println("Current state: " + light.getColor());

        light.change();
        System.out.println("Current state: " + light.getColor());

        light.change();
        System.out.println("Current state: " + light.getColor());

        light.change();
        System.out.println("Current state: " + light.getColor());
    }
}