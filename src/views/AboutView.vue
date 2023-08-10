<template>
   <div >
    <h3 style="background-color: rgb(173, 239, 217); text-align: center; padding: 4px;">Tabulator And Delete</h3>
    <div class="d-flex justify-space-between mb-4 ma-3">
      <v-btn @click="logout" color="#eedd82">Back</v-btn>
      <v-btn @click="goToBulkPage" color="#eedd82">Bulk Stock</v-btn>
    </div>
    <div ref="table"></div>
    <div style="position: fixed;bottom: 14%;">
      <v-btn density="default" color="#ff3456" icon="mdi-open-in-new"  @click="logout"></v-btn>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import { TabulatorFull as Tabulator } from "tabulator-tables";
export default {
  data() {
    return {
      tabulator: null,
      tableData: [],
      currentPage: 1,
      perPage: 10, 
    };
  },
  watch: {
    currentPage() {
      this.onPageChange(this.currentPage);
      if(this.$store.state.authToken === null){
      this.$router.push('/login');
    }
    },
  },
  methods: {
    logout(){
      this.$store.commit("clearAuthToken");
      alert(this.$store.state.authToken);
      this.$router.push("/login");
    },
    onPageChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
    goToBulkPage(){
      this.$router.push('/agGrid');
    },
    getStoreData() {
      const url = "http://127.0.0.1:8000/api/stores";
      const headers = {
        Authorization: `Bearer ${this.$store.state.authToken}`,
      };

      axios
        .get(url, { headers })
        .then(response => {
          console.log("Response:", response.data);
          this.getTableData(response.data)
        })
        .catch(error => {
          console.log("Error:", error);
        });
    },
    getId(e,cell){
      console.log(e,cell)
      //
      const url = `http://127.0.0.1:8000/api/deleteData/${cell._cell.row.data.id}`;
      const headers = {
        Authorization: `Bearer ${this.$store.state.authToken}`,
      };

      axios
        .delete(url, { headers })
        .then(response => {
          console.log("Response:", response.data);
          alert("Deleted Successfull");
          this.getStoreData();
        })
        .catch(error => {
          console.log("Error:", error);
          alert(error);
        });
    },
    getTableData(data_value) {
      this.tabulator = new Tabulator(this.$refs.table, {
        data: data_value,
        layout:"fitColumns",
        maxHeight: 1000,
        reactiveData: true,
        pagination: "local",
        paginationSize: this.perPage,
        columns: [
        {
          title: "Stock No",
          field: "id",
        },
        {
          title: "Item Code",
          field: "code",
        },
        {
          title: "Item Name",
          field: "name",
        },
        {
          title: "Quantity",
          field: "quantity",
        },
        {
          title: "Location",
          field: "location",
        },
        {
          title: "Store Name",
          field: "store_name",
        },
        {
          title: "In-Stock",
          field: "is_in_stock",
        },
        {
          title: "In-Stock Date",
          field: "stock_date",
        },
      {
        title: "About",
        field: "info",
        frozen: true,
        formatter:"image",
        hozAlign:"center",
        headerSort: false,
        formatterParams:{
          height:"25px",
          width:"35px",
        },
        cssClass: "about-cell",
        cellClick: this.getId,
      },
        ],
      });
    },
  },
  mounted() {
    this.getStoreData();
  },
};
</script>
