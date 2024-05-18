package com.courzelo.lms.dto;

public class TrelloBoardDT {
    private String idBoard;
    private String idListToDo;
    private String idListDoing;
    private String idListDone;

    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public String getIdBoard() {
        return idBoard;
    }
    public String getIdListToDo() {
        return idListToDo;
    }
    public String getIdListDoing() {
        return idListDoing;
    }
    public String getIdListDone() {
        return idListDone;
    }


    public void setIdBoard(String idBoard) {
        this.idBoard = idBoard;
    }
    public void setIdListToDo(String idListToDo) {
        this.idListToDo = idListToDo;
    }
    public void setIdListDoing(String idListDoing) {
        this.idListDoing = idListDoing;
    }
    public void setIdListDone(String idListDone) {
        this.idListDone = idListDone;
    }
    public TrelloBoardDT() {
        super();
        // TODO Auto-generated constructor stub
    }
}
