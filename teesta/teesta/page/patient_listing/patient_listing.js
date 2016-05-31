frappe.pages['patient-listing'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Patient Listing',
		single_column: true
	});
	wrapper.patient = new patient(wrapper)
}

patient = Class.extend({
	init: function(wrapper) {
		this.page = wrapper.page
		this.wrapper = $(wrapper).find('.page-content');
		this.set_primary_action();
		this.get_data();
	},

	set_primary_action: function() {
		this.page.set_primary_action(__("Add Patient"), function() {
			/*doc = frappe.model.get_new_name("Patient")
			frappe.set_route("Form", "Patient", doc);*/
			frappe.new_doc("Patient");
		});
	},
	
	get_data: function() {
		var me = this;
		frappe.call({
			method: "teesta.teesta.page.patient_listing.custom_patient.get_patient_data",
			callback: function(r) {
				console.log("get_patient_data");
				me.render_template(r);
			}
		})
	},

	render_template: function(r) {
		console.log("render_template");
		this.wrapper.append(frappe.render_template("patient_listing", {"data": r.message}));
	}
});
