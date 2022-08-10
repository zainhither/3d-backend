const AccessControl = require("accesscontrol");
const roles = require("./roles");

const ac = new AccessControl();

ac.grant(roles.architect).createOwn("model");

const wallsControl = new AccessControl();

//Granting Permissions for wall_type
wallsControl
    .grant([roles.architect, roles.mechanicalEngineer, roles.desider])
    .createOwn("wall_type"); 

//Granting permissions for wall_identity_data
wallsControl
    .grant([
        roles.architect,
        roles.mechanicalEngineer,
        roles.artHistorian,
        roles.desider,
    ])
    .createOwn("wall_identity_data");

//Permissions for analytical_properties
wallsControl
    .grant([roles.architect, roles.mechanicalEngineer, roles.desider])
    .createOwn("analytical_properties");

//Permissions for material_properties
wallsControl
    .grant([roles.architect, roles.desider])
    .createOwn("material_properties.descriptive_info")
    .createOwn("material_properties.annotation_info")
    .createOwn("material_properties.graphics")
    .createOwn("material_properties.appearance")
    .createOwn("material_properties.physical");

wallsControl
    .grant([roles.architect, roles.desider, roles.artHistorian])
    .createOwn("material_properties.production_info");

wallsControl
    .grant([roles.civilEngineer, roles.architect, roles.desider])
    .createOwn("material_properties.material_compressive_strength");

wallsControl
    .grant([roles.desider, roles.mechanicalEngineer])
    .createOwn("material_properties.thermal");

// Permissions for Wall Structual Information
wallsControl
    .grant([roles.civilEngineer, roles.architect, roles.desider])
    .createOwn("wall_structural_info");

//Permissions for building_intervention
wallsControl
    .grant([roles.architect, roles.artHistorian, roles.desider])
    .createOwn("building_intervention.repair_time")
    .createOwn("building_intervention.restoration_year")
    .createOwn("building_intervention.restoration_corporation")
    .createOwn("building_intervention.change_year");

wallsControl
    .grant([
        roles.architect,
        roles.desider,
        roles.artHistorian,
        roles.civilEngineer,
    ])
    .createOwn("building_intervention.repair_type")
    .createOwn("building_intervention.repair_comment")
    .createOwn("building_intervention.restoration_report")
    .createOwn("building_intervention.restoration_comment")
    .createOwn("building_intervention.change_type")
    .createOwn("building_intervention.change_comment");
 

//Permission for WindowControl
const windowControl = new AccessControl();

//window glass_type
windowControl
    .grant([roles.architect, roles.mechanicalEngineer, roles.desider])
    .createOwn("glass_type");

// window identity_data
windowControl
    .grant([
        roles.architect,
        roles.artHistorian,
        roles.desider,
        roles.mechanicalEngineer,
    ])
    .createOwn("identity_data.fire_rating")
    .createOwn("identity_data.cost");

windowControl
    .grant([
        roles.architect,
        roles.artHistorian,
        roles.desider,
        roles.mechanicalEngineer,
        roles.civilEngineer
    ])
    .createOwn("identity_data.type_image")
    .createOwn("identity_data.keynote")
    .createOwn("identity_data.model")
    .createOwn("identity_data.manufacturer")
    .createOwn("identity_data.type_comments")
    .createOwn("identity_data.url")
    .createOwn("identity_data.description")

//  window analytical_properties
windowControl
    .grant([roles.architect, roles.desider, roles.mechanicalEngineer])
        .createOwn("analytical_properties")

// window material_properties
windowControl
    .grant([roles.artHistorian, roles.desider, roles.architect, roles.mechanicalEngineer, roles.electricalEngineer])
        .createOwn("material_properties.descriptive_info")       
        .createOwn("material_properties.production_info")       
        .createOwn("material_properties.annotation_info")       
        .createOwn("material_properties.graphics")       
        .createOwn("material_properties.appearance")       
        .createOwn("material_properties.physical")
        
windowControl
    .grant([roles.artHistorian, roles.desider, roles.architect, roles.civilEngineer])
        .createOwn("material_properties.material_compressive_strength")
        
windowControl
    .grant([roles.artHistorian, roles.desider, roles.mechanicalEngineer])
        .createOwn("material_properties.thermal")     
        
//Window building_intervention
windowControl
    .grant([roles.architect, roles.artHistorian, roles.desider, roles.civilEngineer]) 
        .createOwn("building_intervention.repair_type") 
        .createOwn("building_intervention.repair_comment") 
        .createOwn("building_intervention.restoration_report") 
        .createOwn("building_intervention.restoration_comment") 
        .createOwn("building_intervention.change_type") 
        .createOwn("building_intervention.change_comment")
        
windowControl
    .grant([roles.architect, roles.artHistorian, roles.desider])
        .createOwn("building_intervention.repair_time")   
        .createOwn("building_intervention.restoration_year")  
        .createOwn("building_intervention.restoration_corporation")  
        .createOwn("building_intervention.change_year")
        
// Permission for Door
const doorControl = new AccessControl(); 

//door door_type
doorControl
    .grant([roles.architect, roles.desider, roles.mechanicalEngineer])
        .createOwn("door_type");

// door identity_data
doorControl
    .grant([
        roles.architect,
        roles.artHistorian,
        roles.desider,
    ])
    .createOwn("identity_data.fire_rating")
    .createOwn("identity_data.cost");

doorControl
    .grant([
        roles.architect,
        roles.artHistorian,
        roles.desider,
        roles.civilEngineer
    ])
    .createOwn("identity_data.type_image")
    .createOwn("identity_data.keynote")
    .createOwn("identity_data.model")
    .createOwn("identity_data.manufacturer")
    .createOwn("identity_data.type_comments")
    .createOwn("identity_data.url")
    .createOwn("identity_data.description")    
    
//  door analytical_properties
doorControl
    .grant([roles.architect, roles.desider, roles.mechanicalEngineer])
        .createOwn("analytical_properties")
        
// door material_properties
doorControl
    .grant([roles.artHistorian, roles.desider, roles.architect, roles.mechanicalEngineer, roles.electricalEngineer])
        .createOwn("material_properties.descriptive_info")       
        .createOwn("material_properties.production_info")       
        .createOwn("material_properties.annotation_info")       
        .createOwn("material_properties.graphics")       
        .createOwn("material_properties.appearance")       
        .createOwn("material_properties.physical")
        
doorControl
    .grant([roles.artHistorian, roles.desider, roles.architect, roles.civilEngineer])
        .createOwn("material_properties.material_compressive_strength")
        
doorControl
    .grant([roles.artHistorian, roles.desider, roles.mechanicalEngineer])
        .createOwn("material_properties.thermal")   
        
//Door building_intervention
doorControl
    .grant([roles.architect, roles.artHistorian, roles.desider, roles.civilEngineer]) 
        .createOwn("building_intervention.repair_type") 
        .createOwn("building_intervention.repair_comment") 
        .createOwn("building_intervention.restoration_report") 
        .createOwn("building_intervention.restoration_comment") 
        .createOwn("building_intervention.change_type") 
        .createOwn("building_intervention.change_comment")
        
doorControl
    .grant([roles.architect, roles.artHistorian, roles.desider])
        .createOwn("building_intervention.repair_time")   
        .createOwn("building_intervention.restoration_year")  
        .createOwn("building_intervention.restoration_corporation")  
        .createOwn("building_intervention.change_year")    

//RoofControl permissions         
const roofControl = new AccessControl();

//roof_type
roofControl
    .grant([roles.architect, roles.desider, roles.mechanicalEngineer, roles.civilEngineer])
        .createOwn("roof_type.thickness")
        .createOwn("roof_type.resistance") 

roofControl
    .grant([roles.architect, roles.mechanicalEngineer, roles.desider])
        .createOwn("roof_type.thermal_mass")   
        
roofControl
    .grant([roles.architect, roles.desider, roles.artHistorian, roles.civilEngineer, roles.mechanicalEngineer])
        .createOwn("roof_type.material")
        
//roof identity_data
roofControl
    .grant([roles.architect, roles.artHistorian, roles.desider, roles.civilEngineer])
        .createOwn("identity_data")
        
//roof analytical_properties
roofControl
    .grant([roles.architect, roles.mechanicalEngineer, roles.desider])  
        .createOwn("analytical_properties")  
        
//roof material_properties
roofControl
    .grant([roles.artHistorian, roles.desider, roles.architect, roles.mechanicalEngineer])
        .createOwn("material_properties.descriptive_info")    
        .createOwn("material_properties.production_info") 
        .createOwn("material_properties.annotation_info") 
        .createOwn("material_properties.graphics") 
        .createOwn("material_properties.appearance") 
        .createOwn("material_properties.physical")  
        
 roofControl
    .grant([roles.artHistorian, roles.desider, roles.architect, roles.civilEngineer])  
        .createOwn("material_properties.material_compressive_strength")
        
 roofControl
    .grant([roles.artHistorian, roles.desider, roles.mechanicalEngineer])
        .createOwn("material_properties.thermal")
        
 //roof building_intervention
 roofControl
    .grant([roles.architect, roles.artHistorian, roles.desider, roles.civilEngineer]) 
        .createOwn("building_intervention.repair_type") 
        .createOwn("building_intervention.repair_comment") 
        .createOwn("building_intervention.restoration_report") 
        .createOwn("building_intervention.restoration_comment") 
        .createOwn("building_intervention.change_type") 
        .createOwn("building_intervention.change_comment")
        
roofControl
    .grant([roles.architect, roles.artHistorian, roles.desider])
        .createOwn("building_intervention.repair_time")   
        .createOwn("building_intervention.restoration_year")  
        .createOwn("building_intervention.restoration_corporation")  
        .createOwn("building_intervention.change_year")
        
// Permissions for floor
const floorControl = new AccessControl();

//floor geomatic_info_floor_dimension
floorControl
    .grant([roles.architect, roles.civilEngineer, roles.mechanicalEngineer, roles.artHistorian, roles.geomaticEngineer, roles.desider])
        .createOwn("geo_info_floor_dimension")

//floor_type
floorControl
    .grant([roles.architect, roles.mechanicalEngineer, roles.desider, roles.civilEngineer, roles.artHistorian])
        .createOwn("floor_type.thickness")
        .createOwn("floor_type.material")
        
 floorControl
    .grant([roles.architect, roles.mechanicalEngineer, roles.desider, roles.civilEngineer])
        .createOwn("floor_type.resistance")
        
 floorControl
    .grant([roles.architect, roles.mechanicalEngineer, roles.desider])
        .createOwn("floor_type.thermal_mass")   
        
 //identity_data
floorControl
    .grant([roles.architect, roles.artHistorian, roles.desider, roles.civilEngineer])
        .createOwn("identity_data.type_image")
        .createOwn("identity_data.keynote")
        .createOwn("identity_data.model")
        .createOwn("identity_data.manufacturer")
        .createOwn("identity_data.type_comments")
        .createOwn("identity_data.url")
        .createOwn("identity_data.description")

floorControl
    .grant([roles.architect, roles.artHistorian, roles.desider])
        .createOwn("identity_data.fire_rating")
        .createOwn("identity_data.cost")
        
//floor analytical_properties
floorControl
    .grant([roles.architect, roles.mechanicalEngineer, roles.desider])
        .createOwn("analytical_properties")
        
//floor material_properties
floorControl
    .grant([
    roles.artHistorian,
    roles.desider,
    roles.architect,
    roles.mechanicalEngineer,
    roles.civilEngineer,
])
    .createOwn("material_properties.descriptive_info")
    .createOwn("material_properties.production_info")
    .createOwn("material_properties.annotation_info")
    .createOwn("material_properties.graphics")
    .createOwn("material_properties.appearance")
    .createOwn("material_properties.physical")
    
floorControl
    .grant([roles.artHistorian, roles.desider, roles.architect, roles.civilEngineer])
        .createOwn("material_properties.material_compressive_strength") 
        
floorControl
    .grant([roles.artHistorian, roles.desider, roles.mechanicalEngineer])
        .createOwn("material_properties.thermal") 
        
// floorControl building_intervention
floorControl
    .grant([roles.architect, roles.desider, roles.artHistorian, roles.civilEngineer])
        .createOwn("building_intervention.repair_type")
        .createOwn("building_intervention.repair_comment")  
        .createOwn("building_intervention.restoration_report")  
        .createOwn("building_intervention.restoration_comment")  
        .createOwn("building_intervention.change_type")  
        .createOwn("building_intervention.change_comment")
        
floorControl
    .grant([roles.architect, roles.artHistorian, roles.desider])
        .createOwn("building_intervention.repair_time") 
        .createOwn("building_intervention.restoration_year") 
        .createOwn("building_intervention.restoration_corporation") 
        .createOwn("building_intervention.change_year")

module.exports = ac;
module.exports.wallsControl = wallsControl;
module.exports.windowControl = windowControl;
module.exports.roofControl = roofControl;
module.exports.doorControl = doorControl;
module.exports.floorControl = floorControl;
