
   <template>
  <div class="bulk-entry ">
    <h3 style="background-color: rgb(173, 239, 217);text-align: center; padding: 4px;">Ag-Grid And Edit data</h3>
    <div class="ma-5">
      <div class="d-flex justify-space-between">
        <v-btn @click="goBackToTable" color="#eedd82">Back</v-btn>
        <v-btn @click="saveAllRecords" color="#eedd82">Save All</v-btn>
      </div>
      <ag-grid-vue
        style="width: 100%; height: 400px"
        class="ag-theme-alpine mt-2"
        :columnDefs="columnDefs"
        :rowData="rowData"
        @cell-value-changed="onCellValueChanged"
      ></ag-grid-vue>
    </div>
    <div style="position: fixed;bottom: 14%;">
      <v-btn density="default" color="#ff3456" icon="mdi-open-in-new"  @click="logout"></v-btn>
    </div>
  </div>
</template>
  
  <script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import axios from "axios";

export default {
  components: {
    AgGridVue,
  },
  data() {
    return {
      columnDefs: [
        {
          headerName: "Stock No",
          field: "id",
          editable: true,
          valueGetter: "node.rowIndex + 1",
          cellStyle: { textAlign: "start" }, // start alignment
        },
        {
          headerName: "Item Code",
          field: "code",
          editable: true,
          cellStyle: { textAlign: "start" },
        },
        {
          headerName: "Item Name",
          field: "name",
          editable: true,
          cellStyle: { textAlign: "start" },
        },
        {
          headerName: "Quantity",
          field: "quantity",
          editable: true,
          cellStyle: { textAlign: "start" },
        },
        {
          headerName: "Location",
          field: "location",
          editable: true,
          cellStyle: { textAlign: "start" },
        },
        {
          headerName: "Store Name",
          field: "store_name",
          editable: true,
          cellStyle: { textAlign: "start" },
        },
        {
          headerName: "In-Stock",
          field: "is_in_stock",
          editable: true,
          cellStyle: { textAlign: "start" },
        },
        {
          headerName: "In-Stock Date",
          field: "stock_date",
          editable: true,
          cellStyle: { textAlign: "start" },
        },
      ],

      rowData: [],
      gridOptions: {
        rowValueChanged: this.onRowValueChanged,
      },
      newlyAddedRecord: null,
      modified_data: [],
      modifiedRows: new Set(), // To keep track of modified rows
    };
  },
  mounted() {
   
    if (this.$store.state.authToken === null) {
      this.$router.push("/login");
    }
    this.getStoreData();
  },
  methods: {
    logout(){
      this.$store.commit("clearAuthToken");
      alert(this.$store.state.authToken);
      this.$router.push("/login");
    },
    goBackToTable() {
      this.$router.push("/about");
    },
    onCellValueChanged(event) {
      console.log("fdflfdfkljdlkfjdklsjfkls", event);
      this.modified_data.push(event.data);
    },
    addNewRecord() {
      const newRecord = {
        id: this.rowData.length + 1,
        code: "",
        name: "",
        quantity: null,
        location: "",
        store_name: "",
        is_in_stock: "",
      };

      this.rowData.push(newRecord);
      this.newlyAddedRecord = newRecord;

      // Now you can access the newly added record's data using this.newlyAddedRecord
      console.log("Newly added record:", this.newlyAddedRecord);
    },
    getStoreData() {
      
        const url = "http://127.0.0.1:8000/api/stores";
      const headers = {
        Authorization: `Bearer ${this.$store.state.authToken}`,
      };

      axios
        .get(url, { headers })
        .then((response) => {
          this.modified_data = [];
          this.rowData = response.data;
         
        })
        .catch((error) => {
          console.log("Error:", error);
          alert(error);
        });
    },
    onRowValueChanged(event) {
      const modifiedRow = event.data;
      const modifiedColumns = event.columnApi
        .getAllColumns()
        .filter((column) => {
          return column.isValueChanged(modifiedRow);
        });

      modifiedRow.modifiedColumns = modifiedColumns.map(
        (column) => column.colId
      );

      if (!this.modifiedRows.some((row) => row.id === modifiedRow.id)) {
        this.modifiedRows.push(modifiedRow);
      }
    },
    saveAllRecords() {
      if(this.modified_data.length > 0){
      const url = "http://127.0.0.1:8000/api/edit";
      const headers = {
        Authorization: `Bearer ${this.$store.state.authToken}`,
      };
      axios
        .put(url, this.modified_data, {
          headers,
        })
        .then((response) => {
          console.log("Response:", response.data);
          this.modified_data = [];
          alert("Updated Successfull");
          this.getStoreData();
        })
        .catch((error) => {
          console.log("Error:", error);
          alert(error);
        });
      }
    },
  },
};
</script>
  
  <style>
.bulk-entry {
  text-align: center;
}
</style>
  