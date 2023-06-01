package com.ReservationSystem.ReservationSystemMvc.constants;



public class Context {
	public enum StatusCode {
		SUCCESS, FAILURE, WARNING
	}
	private  String message;
	private Object dataObject;
	private StatusCode statuscode;
	
	public Context(String message, Object dataObject, StatusCode statuscode) {
		super();
		this.message = message;
		this.dataObject = dataObject;
		this.statuscode = statuscode;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getDataObject() {
		return dataObject;
	}
	public void setDataObject(Object dataObject) {
		this.dataObject = dataObject;
	}
	public StatusCode getStatuscode() {
		return statuscode;
	}
	public void setStatuscode(StatusCode statuscode) {
		this.statuscode = statuscode;
	}
	
}
