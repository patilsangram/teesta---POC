import frappe

@frappe.whitelist()
def get_patient_data():
	query = '''select name, added_by, city, 
			country, total_cases, amount_billed, registered_on, DATE_FORMAT(modified,'%m-%d-%Y') as modified, status 
			from `tabPatient`'''
	print frappe.db.sql(query,as_dict=True)
	return frappe.db.sql(query,as_dict=True)