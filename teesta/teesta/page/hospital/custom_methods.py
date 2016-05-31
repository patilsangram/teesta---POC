import frappe

@frappe.whitelist()
def get_hospital_data():
	hosp_query = '''select name, hospital_name, city, DATE_FORMAT(modified,'%m-%d-%Y') as modified, status, pending_with 
				from `tabHospital`'''
	hospital_data = frappe.db.sql(hosp_query,as_dict=True)
	return hospital_data