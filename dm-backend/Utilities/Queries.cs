using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dm_backend.Utilities
{
    public class Queries
    {
        public string getAllUsers = @" 
 select salutation,user_id,role_name,first_name,middle_name,last_name,department_name,designation
 as 'designation_name',email,gender,date_of_birth,date_of_joining,
  group_concat(distinct if(address_type='Current',address_Line1,NULL)) as 'current_address_Line1',
  group_concat(distinct if(address_type='Current',address_Line2,NULL)) as 'current_address_Line2',
  group_concat(distinct if(address_type='Current',city_name,NULL)) as 'current_city',
  group_concat(distinct if(address_type='Current',state_name,NULL)) as 'current_state',
  group_concat(distinct if(address_type='Current',c.country_name,NULL)) as 'current_country',
  group_concat(distinct if(address_type='Current',pin,NULL)) as 'current_pin',
  group_concat(distinct if(address_type='Permanant',address_Line1,NULL)) AS 'permanant_address_Line1',
  group_concat(distinct if(address_type='Permanant',address_Line2,NULL)) AS 'permanant_address_Line2',
  group_concat(distinct if(address_type='Permanant',city_name,NULL)) as 'permanant_city',
  group_concat(distinct if(address_type='Permanant',state_name,NULL)) as 'permanant_state',
  group_concat(distinct if(address_type='Permanant',c.country_name,NULL)) as 'permanant_country',
  group_concat(distinct if(address_type='Permanant',pin,NULL)) as 'permanant_pin',
  group_concat(distinct if(contact_type='Mobile',ca.country_code,NULL)) as 'mobile_country_code',
  group_concat(distinct if(contact_type='Mobile',area_code,NULL)) as 'mobile_area_code',
  group_concat(distinct if(contact_type='Mobile',number,NULL)) as 'mobile_number',
  group_concat(distinct if(contact_type='Work',ca.country_code,NULL)) as 'work_country_code',
  group_concat(distinct if(contact_type='Work',area_code,NULL)) as 'work_area_code',
  group_concat(distinct if(contact_type='Work',number,NULL)) as 'work_number',
  group_concat(distinct if(contact_type='home',ca.country_code,NULL)) as 'home_country_code',
  group_concat(distinct if(contact_type='Home',area_code,NULL)) as 'home_area_code',
  group_concat(distinct if(contact_type='Home',number,NULL)) as 'home_number'
  from user
  
  inner join address using(user_id)
  inner join address_type using(address_type_id)
  inner join city using(city_id)
  inner join state using(state_id)
  inner join country c on c.country_id=state.country_id
  
  inner join contact_number using(user_id)
  inner join contact_type using(contact_type_id)
  inner join country ca on ca.country_id=contact_number.country_id
  inner join salutation using(salutation_id)
  inner join department_designation using(department_designation_id)
  inner join department using(department_id)
  inner join designation using(designation_id)
  inner join gender using(gender_id)
  inner join user_to_role using(user_id)
  inner join role using(role_id)
 # where user.status=1 and
 where user.user_id=user_id
  
  group by user_id;";
    }
}
