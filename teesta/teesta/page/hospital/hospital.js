frappe.pages['hospital'].on_page_load = function(wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: 'Hospital',
    single_column: true
  });
  wrapper.hospital = new hospital(wrapper)
}

hospital = Class.extend({
  init: function(wrapper) {
    this.page = wrapper.page
    this.wrapper = $(wrapper).find('.page-content');
    this.set_primary_action();
    this.get_data();
  },
  set_primary_action: function() {
    this.page.set_primary_action(__("Add Hospital"), function() {
     /* doc = frappe.model.get_new_name("Hospital")
      frappe.set_route("Form", "Hospital", doc);*/
      frappe.new_doc("Hospital")
    });
  },
  
  get_data: function() {
    var me = this;
    frappe.call({
      method: "teesta.teesta.page.hospital.custom_methods.get_hospital_data",
      callback: function(r) {
        me.render_template(r);
      }
    })
  },

  render_template: function(r) {
    var me = this;
    this.page.add_field({
          fieldname: "hospital",
          label: __("Hospital"),
          fieldtype: "Link",
          options: "Hospital"
        });
    this.page.add_field({
            fieldname: "search",
            label: __("Search"),
            fieldtype: "Button",
            icon: "octicon octicon-search navbar-search-icon"
          });
    this.wrapper.append(frappe.render_template("hospital", {"data": r.message})); 
    me.search_hospital();
  },

  search_hospital: function() {
  var me = this
    console.log("Hello");
    me.page.fields_dict.search.$input.on("click",function(){
      console.log("Hello");
      console.log(me.page.fields_dict.hospital.get_value())
      var hosp_name = me.page.fields_dict.hospital.get_value();
      if(hosp_name){
        frappe.set_route("Form", "Hospital", hosp_name);
      }
      else{frappe.msgprint("Please Select Hospital")}
      
    })
  }
})