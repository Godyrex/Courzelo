package com.courzelo.lms.services;

import com.courzelo.lms.dto.ElementModuleDTO;
import com.courzelo.lms.entities.ElementModule;
import com.courzelo.lms.repositories.ElementModuleRepository;
import com.courzelo.lms.utils.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ElementModuleService {

    private final ElementModuleRepository elementModuleRepository;

    public ElementModuleService(final ElementModuleRepository elementModuleRepository) {
        this.elementModuleRepository = elementModuleRepository;
    }

    public List<ElementModuleDTO> findAll() {
        final List<ElementModule> elementModules = elementModuleRepository.findAll(Sort.by("id"));
        return elementModules.stream()
                .map(elementModule -> mapToDTO(elementModule, new ElementModuleDTO()))
                .toList();
    }

    public ElementModuleDTO get(final String id) {
        return elementModuleRepository.findById(id)
                .map(elementModule -> mapToDTO(elementModule, new ElementModuleDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public String create(final ElementModuleDTO elementModuleDTO) {
        final ElementModule elementModule = new ElementModule();
        mapToEntity(elementModuleDTO, elementModule);
        return elementModuleRepository.save(elementModule).getId();
    }

    public void update(final String id, final ElementModuleDTO elementModuleDTO) {
        final ElementModule elementModule = elementModuleRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(elementModuleDTO, elementModule);
        elementModuleRepository.save(elementModule);
    }

    public void delete(final String id) {
        elementModuleRepository.deleteById(id);
    }

    private ElementModuleDTO mapToDTO(final ElementModule elementModule,
            final ElementModuleDTO elementModuleDTO) {
        elementModuleDTO.setId(elementModule.getId());
        elementModuleDTO.setNmbrHours(elementModule.getNmbrHours());
        elementModuleDTO.setName(elementModule.getName());
        elementModuleDTO.setDayOfWeeks(elementModule.getDayOfWeeks());
        elementModuleDTO.setPeriods(elementModule.getPeriods());
        //elementModuleDTO.setClasses(elementModule.getClasses());
        elementModuleDTO.setModule(elementModule.getModule());
        elementModuleDTO.setSemesters(elementModule.getSemesters());
        elementModuleDTO.setDepartments(elementModule.getDepartments());
        return elementModuleDTO;
    }

    private ElementModule mapToEntity(final ElementModuleDTO elementModuleDTO,
            final ElementModule elementModule) {
        elementModule.setNmbrHours(elementModuleDTO.getNmbrHours());
        elementModule.setName(elementModuleDTO.getName());
        elementModule.setDayOfWeeks(elementModuleDTO.getDayOfWeeks());
        elementModule.setPeriods(elementModuleDTO.getPeriods());
        //elementModule.setClasses(elementModuleDTO.getClasses());
        elementModule.setModule(elementModuleDTO.getModule());
        elementModule.setSemesters(elementModuleDTO.getSemesters());
        elementModule.setDepartments(elementModuleDTO.getDepartments());
        return elementModule;
    }

    public ElementModule getElementDeModuleById(String id) {
        return elementModuleRepository.findById(id).orElseThrow(() -> new RuntimeException("Module Element number " + id + " does not exist!"));
    }

   /* public List<ElementModule>getEmploisByClass(String classe){
        return elementModuleRepository.findByClasse(classe);
    }*/

}
