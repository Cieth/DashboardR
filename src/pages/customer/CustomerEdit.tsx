import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonCard,
  IonItem,
  IonButton,
  IonIcon,
  IonLabel,
  IonInput,
} from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Customer from './Customer';
import { saveCustomer, searchCustomerById } from './CustomerApi';
import './CustomerList.css';
const CustomerEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>();
  const history = useHistory();
  const [customer, setCustomer] = useState<Customer>({});

  const save = () => {
    saveCustomer(customer);
    history.push('/page/customers');
  };

  const search = async () => {
    if (id === 'new') {
      setCustomer({});
    } else {
      const result = await searchCustomerById(id);
      setCustomer(result);
    }
  };
  useEffect(() => {
    search();
  }, [history.location.pathname]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name || 'Clientes'} </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonTitle>
            {id === 'new' ? 'Agregar Cliente' : 'Editar cliente'}{' '}
          </IonTitle>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Nombre</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (customer.firstName = String(e.detail.value))
                  }
                  value={customer.firstName}
                  placeholder='Enter your name'
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Apellido</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (customer.lastName = String(e.detail.value))
                  }
                  value={customer.lastName}
                  placeholder='Enter your last name'
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Email</IonLabel>
                <IonInput
                  onIonChange={(e) => (customer.email = String(e.detail.value))}
                  value={customer.email}
                  placeholder='Enter your email'
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Dirección</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (customer.address = String(e.detail.value))
                  }
                  value={customer.address}
                  placeholder='Enter your address'
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Teléfono</IonLabel>
                <IonInput
                  onIonChange={(e) => (customer.phone = String(e.detail.value))}
                  value={customer.phone}
                  placeholder='Enter your phone number'
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>

          <IonItem>
            <IonButton onClick={save} color='success' fill='solid' slot='end'>
              <IonIcon icon={checkmark} />
              Guardar
            </IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerEdit;
