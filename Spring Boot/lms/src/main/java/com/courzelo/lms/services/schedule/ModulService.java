package com.courzelo.lms.services.schedule;

import com.courzelo.lms.dto.program.ClassDTO;
import com.courzelo.lms.dto.schedule.ModulDTO;
import com.courzelo.lms.entities.institution.Class;
import com.courzelo.lms.entities.schedule.Department;
import com.courzelo.lms.entities.schedule.ElementModule;
import com.courzelo.lms.entities.schedule.Modul;
import com.courzelo.lms.repositories.ClassRepository;
import com.courzelo.lms.repositories.ElementModuleRepository;
import com.courzelo.lms.repositories.ModulRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.courzelo.lms.utils.NotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ModulService {
    private final ModulRepository modulRepository;
    private final ElementModuleRepository elementModuleRepository;
    private final ClassRepository classRepository;

    public ModulService(final ModulRepository modulRepository,
                        final ElementModuleRepository elementModuleRepository, ClassRepository classRepository) {
        this.modulRepository = modulRepository;
        this.elementModuleRepository = elementModuleRepository;
        this.classRepository = classRepository;
    }

    public List<ModulDTO> findAll() {
        final List<Modul> moduls = modulRepository.findAll(Sort.by("id"));
        return moduls.stream()
                .map(modul -> mapToDTO(modul, new ModulDTO()))
                .toList();
    }

    public ModulDTO get(final String id) {
        return modulRepository.findById(id)
                .map(modul -> mapToDTO(modul, new ModulDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public String create(final ModulDTO modulDTO) {
        final Modul modul = new Modul();
        mapToEntity(modulDTO, modul);
        modul.setId(modulDTO.getId());
        return modulRepository.save(modul).getId();
    }
    public Modul createModul(ModulDTO modulDTO) {
        List<ElementModule> elementModules = modulDTO.getElementModules().stream()
                .map(dto -> {
                    ElementModule elementModule = new ElementModule();
                    elementModule.setName(dto.getName());
                    return elementModuleRepository.save(elementModule);
                })
                .collect(Collectors.toList());
        Class classDTO = modulDTO.getAClass();
        Class aClass = new Class();
        if (classDTO != null) {
            aClass.setName(classDTO.getName());
        } else {
            throw new IllegalArgumentException("ClassDTO is null");
        }
        aClass = classRepository.save(aClass);
        Modul modul = new Modul();
        modul.setName(modulDTO.getName());
        modul.setElementModules(elementModules);
        modul.setAClass(aClass);
        return modulRepository.save(modul);
    }

    public void update(final String id, final ModulDTO modulDTO) {
        final Modul modul = modulRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(modulDTO, modul);
        modulRepository.save(modul);
    }

    public void delete(final String id) {
        modulRepository.deleteById(id);
    }

    private ModulDTO mapToDTO(final Modul modul, final ModulDTO modulDTO) {
        modulDTO.setId(modul.getId());
        modulDTO.setNmbrHours(modul.getNmbrHours());
        modulDTO.setName(modul.getName());
        modulDTO.setIsSeperated(modul.getIsSeperated());
        modulDTO.setIsMetuale(modul.getIsMetuale());
        modulDTO.setElementModules(modul.getElementModules());
        modulDTO.setAClass(modul.getAClass());

        //modulDTO.setElement(modul.getElement() == null ? null : modul.getElement().getId());
        return modulDTO;
    }

    private Modul mapToEntity(final ModulDTO modulDTO, final Modul modul) {
        modul.setNmbrHours(modulDTO.getNmbrHours());
        modul.setName(modulDTO.getName());
        modul.setIsSeperated(modulDTO.getIsSeperated());
        modul.setIsMetuale(modulDTO.getIsMetuale());
        modul.setElementModules(modulDTO.getElementModules());
        modul.setAClass(modulDTO.getAClass());
        /*final ElementModule element = modulDTO.getElement() == null ? null : elementModuleRepository.findById(modulDTO.getElement())
                .orElseThrow(() -> new NotFoundException("element not found"));
        modul.setElement(element);*/
        return modul;
    }

    public boolean idExists(final String id) {
        return modulRepository.existsByIdIgnoreCase(id);
    }
    public Modul addModul(Modul modul ) {
        return modulRepository.save(modul);
    }

}