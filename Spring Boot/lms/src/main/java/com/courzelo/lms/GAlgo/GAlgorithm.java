package com.courzelo.lms.GAlgo;

import com.courzelo.lms.dto.program.ClassDTO;
import com.courzelo.lms.entities.schedule.ElementModule;
import com.courzelo.lms.entities.schedule.Modul;
import com.courzelo.lms.entities.schedule.Period;
import com.courzelo.lms.services.schedule.DataFromDB;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class GAlgorithm {
    private  final int POPULATION_SIZE = 10;
    private  final double MUTATION_RATE = 0.2;
    private  final double CROSSOVER_RATE = 0.9;
    private  final int MAX_GENERATIONS = 50;
    Period[] timeslots;
    List<DayOfWeek> days;

    private   final int targetFitness = 1;
    Random random = new Random();
    private List<UniversityTimetable> population;
    private boolean isTerminated;
    public GAlgorithm() {
        this.population = new ArrayList<>(POPULATION_SIZE);
        this.isTerminated = false;

        timeslots = Period.values();
        days = new ArrayList<>();
        days.add(DayOfWeek.MONDAY);
        days.add(DayOfWeek.TUESDAY);
        days.add(DayOfWeek.WEDNESDAY);
        days.add(DayOfWeek.THURSDAY);
        days.add(DayOfWeek.FRIDAY);
    }
    private DayOfWeek getRandomDay() {
        int index = random.nextInt(days.size());
        return days.get(index);
    }
    private Period getRandomPeriode(DayOfWeek day) {
        // if day equal wednesday and periode equal P3 or P4 then rgenerate periode
        if (day.equals(DayOfWeek.WEDNESDAY)) {
            int index = random.nextInt(timeslots.length);
            while (timeslots[index].equals(Period.P3) || timeslots[index].equals(Period.P4)) {
                index = random.nextInt(timeslots.length);
            }
            return timeslots[index];
        }
        else {
            int index = random.nextInt(timeslots.length);
            return timeslots[index];
        }
    }
    private List<ElementModule> getElementsForClasse(String className) {
        List<ElementModule> elementModules = new ArrayList<>();
        for (ElementModule element : elementModules) {
            if (element.getClasses().contains(className)) {
                elementModules.add(element);
            }
        }
        return elementModules;
    }
    private List<ElementModule> getElementsForClasse(ClassDTO classe) {
        List<ElementModule> elementModules = new ArrayList<>();
        for (Modul module : classe.getModuls()) {
            elementModules.addAll(module.getElementModules());
        }
        return elementModules;
    }
    public void initializePopulation() {
        for (int i = 0; i < POPULATION_SIZE; i++) {
            UniversityTimetable universityTimetable= new UniversityTimetable(DataFromDB.classDTOS.size());
            for (int classIndex = 0; classIndex < DataFromDB.classDTOS.size(); classIndex++) {
                ClassDTO classe=DataFromDB.classDTOS.get(classIndex);
                List<ElementModule> elements = getElementsForClasse(classe);
                Collections.shuffle(elements);

                for (ElementModule element : elements) {
                    DayOfWeek day = getRandomDay();
                    Period periode = getRandomPeriode(day);
                    element.setDayOfWeek(day);
                    element.setPeriod(periode);
                    universityTimetable.addElementDeModule(classIndex, element);
                }
            }
            population.add(universityTimetable);
        }
    }
    public void printTimetable(UniversityTimetable universityTimetable) {
        System.out.println("SchoolTimetable with fitness : " + universityTimetable.getFitness() + " %");
        for (int classIndex = 0; classIndex < universityTimetable.getNumberOfClasses(); classIndex++) {
            System.out.println("Class " + universityTimetable.getTimetable(classIndex).get(0).getModul().getAClass().getName() + ":");
            List<ElementModule> classTimetable = universityTimetable.getTimetable(classIndex);
            System.out.println("classTimetable size " + classTimetable.size());
            for (ElementModule element : classTimetable) {
                String day = element.getDayOfWeek().toString();
                String period = element.getPeriod().toString();
                String module = element.getModul().getName();

                System.out.println("Day: " + day + ", Period: " + period + ", Room: "  + module + ", Teacher: " + element.getTeacher().getName() + " Element: " + element.getName());
            }
            System.out.println();
        }
    }
    public void evolve() {
        for (int generation = 0; generation < MAX_GENERATIONS; generation++) {
            List<UniversityTimetable> newPopulation = new ArrayList<>(POPULATION_SIZE);

            for (int j = 0; j < POPULATION_SIZE / 2; j++) {
                UniversityTimetable parent1 = selectParent();
                UniversityTimetable parent2 = selectParent();

                if (random.nextDouble() <= CROSSOVER_RATE) {
                    List<UniversityTimetable> children = crossover(parent1, parent2);

                    if (random.nextDouble() <= MUTATION_RATE) {
                        mutate(children.get(0));
                    }
                    if (random.nextDouble() <= MUTATION_RATE) {
                        mutate(children.get(1));
                    }

                    newPopulation.add(children.get(0));
                    newPopulation.add(children.get(1));
                } else {
                    newPopulation.add(parent1);
                    newPopulation.add(parent2);
                }
            }

            // Calculate fitness for the new population
            for (UniversityTimetable universityTimetable : newPopulation) {
                universityTimetable.calculateFitness();
            }

            population = newPopulation;

            System.out.println("Generation " + generation + " with population size: " + population.size());
            for (UniversityTimetable universityTimetable : population) {
                System.out.println(universityTimetable .getFitness());
            }

            // Termination condition based on fitness threshold or lack of improvement
            if ( getBestTimetable().getFitness() <= targetFitness) {
                isTerminated = true;
                break;
            }
        }
    }
    public UniversityTimetable getBestTimetable() {
        // if (isTerminated) {
        UniversityTimetable bestUniversityTimetable = population.get(0);
        double bestFitness = bestUniversityTimetable.calculateFitness();

        for (int i = 1; i < POPULATION_SIZE; i++) {
            UniversityTimetable currentUniversityTimetable = population.get(i);
            double currentFitness = currentUniversityTimetable.calculateFitness();

            if (currentFitness < bestFitness) {
                bestUniversityTimetable = currentUniversityTimetable;
                bestFitness = currentFitness;
            }
        }

        return bestUniversityTimetable;
       /* } else {
            throw new IllegalStateException("Algorithm has not terminated yet.");
        }*/
    }
    private UniversityTimetable selectParent() {
        int totalFitness = 0;
        for (UniversityTimetable universityTimetable : population) {
            totalFitness += universityTimetable.calculateFitness();
        }

        int randomFitness = random.nextInt(totalFitness);
        int cumulativeFitness = 0;

        for (UniversityTimetable universityTimetable : population) {
            cumulativeFitness += (totalFitness - universityTimetable.calculateFitness());
            if (cumulativeFitness > randomFitness) {
                return universityTimetable;
            }
        }

        // If no individual is selected (should not happen), return a random one
        return population.get(random.nextInt(population.size()));
    }
    public List<UniversityTimetable> crossover(UniversityTimetable parent1,UniversityTimetable parent2) {
        Random random = new Random();
        int numberOfClasses = parent1.getNumberOfClasses();
        // Create offspring timetables
        UniversityTimetable offspring1 = new UniversityTimetable(numberOfClasses);
        UniversityTimetable offspring2 = new UniversityTimetable(numberOfClasses);

        // Perform crossover for each class
        for (int classIndex = 0; classIndex < numberOfClasses; classIndex++) {
            List<ElementModule> parent1Timetable = parent1.getTimetable(classIndex);// IIBDCC emplois du temps 1
            List<ElementModule> parent2Timetable = parent2.getTimetable(classIndex);// IIBDCC emplois du temps 2

            int timetableSize = parent1Timetable.size();

            // Determine crossover point
            int crossoverPoint = random.nextInt((timetableSize / 2) - 1) + 1;
            //exit(0);
            // Create child timetables by combining parent schedules
            List<ElementModule> child1Timetable = new ArrayList<>(parent1Timetable.subList(0, crossoverPoint));
            List<ElementModule> child2Timetable = new ArrayList<>(parent2Timetable.subList(0, crossoverPoint));

            List<ElementModule> remainingElementsParent1 = parent1Timetable.stream().filter(element -> !child2Timetable.contains(element)).toList();

            List<ElementModule> remainingElementsParent2 = parent2Timetable.stream().filter(element -> !child1Timetable.contains(element)).toList();

            // Add remaining elements from the other parent to each child timetable
            child1Timetable.addAll(remainingElementsParent2);
            child2Timetable.addAll(remainingElementsParent1);

            // Add child timetables to offspring
            offspring1.getTimetable(classIndex).addAll(child1Timetable);
            offspring2.getTimetable(classIndex).addAll(child2Timetable);
        }

        List<UniversityTimetable> offspring = new ArrayList<>();
        offspring.add(offspring1);
        offspring.add(offspring2);

        return offspring;
    }
    private void mutate(UniversityTimetable universityTimetable) {
        // Select a class to mutate
        int classIndex = random.nextInt(universityTimetable.getNumberOfClasses());
        List<ElementModule> classTimetable = universityTimetable.getTimetable(classIndex);
        // Select two positions in the class timetable
        int position1 = random.nextInt(classTimetable.size());
        int position2 = random.nextInt(classTimetable.size());
        // Randomly reassign day and period for the element in the updated timetable
        DayOfWeek randomDay = getRandomDay();
        Period randomPeriod = getRandomPeriode(randomDay);
        classTimetable.get(position1).setDayOfWeek(randomDay);
        classTimetable.get(position1).setPeriod(randomPeriod);
        // Swap the elements at the selected positions
        universityTimetable.swapGenes(classIndex, position1, position2);
/*
        // Select another individual to get the new timetable from
        int classIndex2 = random.nextInt(schoolTimetable.getNumberOfClasses());
        List<ElementDeModule> classTimetable2 = schoolTimetable.getTimetable(classIndex2);
        // Replace the timetable of the selected class with the timetable from the second individual
        schoolTimetable.setTimetable(classIndex, classTimetable2);
*/

    }
    public UniversityTimetable generateTimetable() {
        initializePopulation();
        evolve();

        return getBestTimetable();
        //System.out.println("****************** individual best *******************");
        //printTimetable(bestSchoolTimetable);
    }

}



